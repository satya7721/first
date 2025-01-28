"use client"
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react"; // Icon for stars

// Type definition for products
type Product = {
  id: string;
  title: string;
  thumbnail: string;
  rating: number;
};

export default function PostList() {
  const [posts, setPosts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [trendingProduct, setTrendingProduct] = useState<Product | null>(null);

  // Fetch products data with a 1.5-second delay
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // 1.5-second delay
      const data = await fetch("https://dummyjson.com/products");
      const { products } = await data.json(); // Extract 'products' from the response
      const formattedProducts = products.map((product: any) => ({
        id: product.id,
        title: product.title,
        thumbnail: product.thumbnail,
        rating: product.rating,
      }));
      setPosts(formattedProducts);
      setIsLoading(false);

      // Retrieve trending product from localStorage
      const trendingProductId = localStorage.getItem("trendingProductId");
      if (trendingProductId) {
        const product = formattedProducts.find((p:Product) => p.id.toString() === trendingProductId);
        setTrendingProduct(product || null);
      }
    };

    fetchData();
  }, []);

  // Filter posts by title based on search input
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  // Generate star icons based on rating
  const renderStars = (rating: number) => {
    const roundedRating = Math.round(rating);
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < roundedRating ? "text-yellow-500" : "text-gray-300"
        }`}
        fill={index < roundedRating ? "currentColor" : "none"}
      />
    ));
  };

  // Handle "View Details" click
  const handleViewDetails = (id: string) => {
    localStorage.setItem("trendingProductId", id); // Store product ID in localStorage
    alert(`Product ID ${id} stored as trending!`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Product Explorer</h1>
        <Input
          type="text"
          placeholder="Search by title..."
          className="w-80"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled={isLoading} // Disable search input while loading
        />
      </nav>

      {/* Trending Product */}
      {trendingProduct && (
        <div className="mt-6 px-6">
          <h2 className="text-2xl font-bold mb-4">Trending Product</h2>
          <Card className="flex flex-col sm:flex-row items-center gap-4 p-4 shadow-lg rounded-2xl">
            <img
              src={trendingProduct.thumbnail}
              alt={trendingProduct.title}
              className="w-32 h-32 object-cover rounded-lg"
            />
            <div>
              <h3 className="text-lg font-semibold">{trendingProduct.title}</h3>
              <div className="flex items-center mt-2">
                {renderStars(trendingProduct.rating)}
                <span className="ml-2 text-sm text-gray-500">
                  ({trendingProduct.rating.toFixed(1)})
                </span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <div className="flex justify-center items-center mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Card
                  key={index}
                  className="w-full max-w-sm shadow-lg rounded-2xl overflow-hidden"
                >
                  <Skeleton className="w-full h-52" />
                  <CardHeader>
                    <Skeleton className="w-3/4 h-6 mb-2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="w-full h-4 mb-2" />
                    <Skeleton className="w-5/6 h-4" />
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <Skeleton className="w-24 h-8" />
                    <Skeleton className="w-12 h-6" />
                  </CardFooter>
                </Card>
              ))
            : filteredPosts.length > 0
            ? filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="w-full max-w-sm shadow-lg hover:shadow-xl transition-shadow rounded-2xl overflow-hidden"
                >
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-52 object-cover"
                  />
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold truncate">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-600">
                    <div className="flex items-center mb-2">
                      {renderStars(post.rating)} {/* Display stars */}
                      <span className="ml-2 text-sm text-gray-500">
                        ({post.rating.toFixed(1)})
                      </span>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <Button
                      variant="outline"
                      onClick={() => handleViewDetails(post.id.toString())}
                    >
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))
            : (
              <p className="text-gray-500 col-span-full text-center">
                No products found.
              </p>
            )}
        </div>
      </div>
    </div>
  );
}
