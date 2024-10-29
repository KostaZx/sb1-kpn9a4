import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface PackageDetails {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  sale?: {
    active: boolean;
    discount: number;
  };
}

export default function Package() {
  const { id } = useParams();
  const { data: pkg, isLoading } = useQuery<PackageDetails>(['package', id], async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_TEBEX_API_URL}/packages/${id}`);
    return data;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!pkg) return null;

  const price = pkg.sale?.active 
    ? (pkg.price * (1 - pkg.sale.discount / 100)) / 100
    : pkg.price / 100;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {pkg.image && (
          <img 
            src={pkg.image} 
            alt={pkg.name} 
            className="w-full h-64 object-cover"
          />
        )}
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{pkg.name}</h1>
          <div className="prose max-w-none mb-6">
            <p>{pkg.description}</p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              {pkg.sale?.active && (
                <span className="text-lg text-gray-500 line-through mr-2">
                  ${(pkg.price / 100).toFixed(2)}
                </span>
              )}
              <span className="text-2xl font-bold text-blue-600">
                ${price.toFixed(2)}
              </span>
            </div>
            <button 
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              onClick={() => {
                // TODO: Implement add to cart functionality
                console.log('Add to cart:', pkg.id);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}