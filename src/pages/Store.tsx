import { useQuery } from 'react-query';
import { getCategories } from '../lib/api';
import PackageCard from '../components/PackageCard';

export default function Store() {
  const { data: categories, isLoading } = useQuery('categories', getCategories);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {categories?.map((category: any) => (
        <div key={category.id}>
          <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.packages?.map((pkg: any) => (
              <PackageCard key={pkg.id} package={pkg} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}