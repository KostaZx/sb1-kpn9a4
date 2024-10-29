import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchPackages } from '../api/tebex';
import PackageCard from '../components/PackageCard';

export default function Home() {
  const { data: packages, isLoading } = useQuery(['packages'], fetchPackages);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Featured Packages</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages?.map((pkg) => (
          <Link key={pkg.id} to={`/package/${pkg.id}`}>
            <PackageCard package={pkg} />
          </Link>
        ))}
      </div>
    </div>
  );
}