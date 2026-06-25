"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Heart,
  Search,
  Trash2,
  ShoppingCart,
  Clock,
  Users,
  Play,
  Filter,
  X,
  Check,
} from "lucide-react";
import { toast } from "react-hot-toast";

const wishlistItems = [
  {
    id: "1",
    title: "Advanced Computational Chemistry",
    thumbnail: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&q=80",
    instructor: "Dr. Sarah Johnson",
    price: 79.99,
    originalPrice: 129.99,
    category: "Chemistry",
    level: "Advanced",
    duration: "35 hours",
    students: 1250,
    rating: 4.8,
    isFree: false,
    isOnSale: true,
  },
  {
    id: "2",
    title: "Deep Learning for Drug Discovery",
    thumbnail: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=400&q=80",
    instructor: "Prof. Michael Chen",
    price: 0,
    originalPrice: 0,
    category: "AI & ML",
    level: "Expert",
    duration: "40 hours",
    students: 890,
    rating: 4.9,
    isFree: true,
    isOnSale: false,
  },
  {
    id: "3",
    title: "Bioinformatics with Python",
    thumbnail: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=400&q=80",
    instructor: "Dr. James Park",
    price: 49.99,
    originalPrice: 49.99,
    category: "Bioinformatics",
    level: "Intermediate",
    duration: "25 hours",
    students: 2100,
    rating: 4.7,
    isFree: false,
    isOnSale: false,
  },
];

export default function WishlistPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState(wishlistItems);
  const [selectedItem, setSelectedItem] = useState<typeof wishlistItems[0] | null>(null);

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemove = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
    toast.success("Removed from wishlist");
  };

  const handleEnroll = (item: typeof wishlistItems[0]) => {
    if (item.isFree) {
      toast.success(`Enrolled in ${item.title}!`);
      setItems(items.filter((i) => i.id !== item.id));
    } else {
      toast.success(`Added ${item.title} to cart!`);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <p className="text-muted-foreground">
          Save courses you want to take later.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-red-500/20 flex items-center justify-center">
              <Heart className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{items.length}</p>
              <p className="text-sm text-muted-foreground">Saved Courses</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Check className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {items.filter((i) => i.isFree).length}
              </p>
              <p className="text-sm text-muted-foreground">Free Courses</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-brand-purple-500/20 flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-brand-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                ${items
                  .filter((i) => !i.isFree)
                  .reduce((sum, i) => sum + i.price, 0)
                  .toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">Total Value</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search wishlist..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
              <div className="relative aspect-video">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Badge className="absolute top-3 left-3" variant="secondary">
                  {item.level}
                </Badge>
                {item.isOnSale && (
                  <Badge className="absolute top-3 right-3" variant="destructive">
                    Sale
                  </Badge>
                )}
                {item.isFree && (
                  <Badge className="absolute top-3 right-3 bg-green-500">
                    Free
                  </Badge>
                )}
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute bottom-3 right-3 rounded-full"
                  onClick={() => handleRemove(item.id)}
                >
                  <Heart className="h-4 w-4 fill-current" />
                </Button>
              </div>
              <CardContent className="p-4 flex-1">
                <Badge variant="outline" className="mb-2">
                  {item.category}
                </Badge>
                <h3 className="font-semibold mb-1 line-clamp-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  by {item.instructor}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {item.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {item.students.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(item.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-1 text-sm">{item.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {item.isFree ? (
                      <span className="text-lg font-bold text-green-600">Free</span>
                    ) : (
                      <>
                        <span className="text-lg font-bold">${item.price}</span>
                        {item.isOnSale && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${item.originalPrice}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
              <div className="p-4 pt-0 flex gap-2">
                <Button
                  className="flex-1 gap-2"
                  onClick={() => handleEnroll(item)}
                >
                  <Play className="h-4 w-4" />
                  {item.isFree ? "Enroll Free" : "Add to Cart"}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 gap-2"
                  onClick={() => setSelectedItem(item)}
                >
                  View Details
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Your wishlist is empty</h3>
          <p className="text-muted-foreground mb-4">
            Save courses you want to take later.
          </p>
          <Button asChild>
            <Link href="/courses">Browse Courses</Link>
          </Button>
        </div>
      )}

      {/* Course Detail Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-2xl">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedItem.title}</DialogTitle>
                <DialogDescription>
                  by {selectedItem.instructor}
                </DialogDescription>
              </DialogHeader>
              <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
                <Image
                  src={selectedItem.thumbnail}
                  alt={selectedItem.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge>{selectedItem.category}</Badge>
                  <Badge variant="outline">{selectedItem.level}</Badge>
                  <Badge variant="outline">{selectedItem.duration}</Badge>
                  {selectedItem.isFree && <Badge variant="default">Free</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">
                  {selectedItem.students.toLocaleString()} students enrolled
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(selectedItem.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2">{selectedItem.rating} rating</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {selectedItem.isFree ? (
                    <span className="text-2xl font-bold text-green-600">Free</span>
                  ) : (
                    <>
                      <span className="text-2xl font-bold">${selectedItem.price}</span>
                      {selectedItem.isOnSale && (
                        <span className="text-lg text-muted-foreground line-through">
                          ${selectedItem.originalPrice}
                        </span>
                      )}
                    </>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1 gap-2" onClick={() => handleEnroll(selectedItem)}>
                    <Play className="h-4 w-4" />
                    {selectedItem.isFree ? "Enroll Free" : "Add to Cart"}
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                      handleRemove(selectedItem.id);
                      setSelectedItem(null);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
