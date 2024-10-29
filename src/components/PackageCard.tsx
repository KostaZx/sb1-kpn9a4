interface PackageCardProps {
  package: {
    id: number;
    name: string;
    price: number;
    image?: string;
    description: string;
    sale?: {
      active: boolean;
      discount: number;
    };
  };
}

export default function PackageCard({ package: pkg }: PackageCardProps) {
  const price = pkg.sale?.active 
    ? (pkg.price * (1 - pkg.sale.discount / 100)) / 100
    : pkg.price / 100;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {pkg.image && (
        <img 
          src={pkg.image} 
          alt={pkg.name} 
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{pkg.name}</h2>
        <p className="text-gray-600 mb-4 line-clamp-2">{pkg.description}</p>
        <div className="flex items-center justify-between">
          <div>
            {pkg.sale?.active && (
              <span className="text-sm text-gray-500 line-through mr-2">
                ${(pkg.price / 100).toFixed(2)}
              </span>
            )}
            <span className="text-lg font-bold text-blue-600">
              ${price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}