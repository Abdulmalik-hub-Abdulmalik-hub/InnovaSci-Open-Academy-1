import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

// GET /api/courses - Get all published courses
export async function GET(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get("status") || "published";
  const limit = parseInt(searchParams.get("limit") || "20");
  const offset = parseInt(searchParams.get("offset") || "0");
  const category = searchParams.get("category");
  const difficulty = searchParams.get("difficulty");
  const search = searchParams.get("search");

  let query = supabase
    .from("courses")
    .select(`
      id,
      title,
      slug,
      short_description,
      thumbnail_url,
      category,
      difficulty_level,
      duration_hours,
      price,
      is_free,
      status,
      created_at,
      instructor:profiles!courses_instructor_id_fkey(full_name, avatar_url)
    `)
    .eq("status", status)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (category) {
    query = query.eq("category", category);
  }

  if (difficulty) {
    query = query.eq("difficulty_level", difficulty);
  }

  if (search) {
    query = query.ilike("title", `%${search}%`);
  }

  const { data: courses, error, count } = await query;

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }

  // Get enrollment counts for each course
  const courseIds = courses?.map((c: { id: string }) => c.id) || [];
  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("course_id")
    .in("course_id", courseIds);

  const enrollmentCounts = enrollments?.reduce((acc, e) => {
    acc[e.course_id] = (acc[e.course_id] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  const coursesWithCounts = courses?.map((course) => ({
    ...course,
    enrolled_count: enrollmentCounts[course.id] || 0,
  }));

  return NextResponse.json({
    courses: coursesWithCounts,
    total: count || 0,
    limit,
    offset,
  });
}

// POST /api/courses - Create a new course (admin only)
export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient();

  // Check authentication
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check admin role
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (!profile || !["ADMIN", "SUPER_ADMIN", "INSTRUCTOR", "COURSE_MANAGER"].includes(profile.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const {
      title,
      slug,
      code,
      category,
      subcategory,
      short_description,
      full_description,
      learning_outcomes,
      prerequisites,
      target_audience,
      difficulty_level,
      language,
      duration_hours,
      thumbnail_url,
      promo_video_url,
      price,
      is_free,
      status,
    } = body;

    // Generate slug if not provided
    const finalSlug = slug || title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

    // Generate course code if not provided
    const finalCode = code || `ISA-${Date.now().toString(36).toUpperCase()}`;

    const { data: course, error } = await supabase
      .from("courses")
      .insert({
        title,
        slug: finalSlug,
        code: finalCode,
        category,
        subcategory,
        short_description,
        full_description,
        learning_outcomes,
        prerequisites,
        target_audience,
        difficulty_level: difficulty_level || "BEGINNER",
        language: language || "English",
        duration_hours,
        thumbnail_url,
        promo_video_url,
        price: price || 0,
        is_free: is_free !== undefined ? is_free : true,
        status: status || "DRAFT",
        instructor_id: user.id,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ course }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}