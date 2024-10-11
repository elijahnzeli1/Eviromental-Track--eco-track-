import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

interface HomeProps {
  initialCocktails: Cocktail[];
  category: string;
}

export default function Home({ initialCocktails, category }: HomeProps) {
  const [cocktails, setCocktails] = useState<Cocktail[]>(initialCocktails);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMoreCocktails = async () => {
      setLoading(true);
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
      const data = await response.json();
      setCocktails(prevCocktails => [...prevCocktails, ...data.drinks]);
      setLoading(false);
    };

    // Fetch more cocktails when the component mounts
    fetchMoreCocktails();
  }, [category]);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4">Cocktails in {category} Category</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cocktails.map((cocktail) => (
          <div key={cocktail.idDrink} className="border rounded-lg p-4">
            <Image
              src={cocktail.strDrinkThumb}
              alt={cocktail.strDrink}
              width={300}
              height={300}
              className="rounded-lg"
            />
            <h2 className="text-xl font-semibold mt-2">{cocktail.strDrink}</h2>
          </div>
        ))}
      </div>
      {loading && <p className="text-center my-4">Loading more cocktails...</p>}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const category = 'Cocktail'; // You can make this dynamic based on user input or route parameters
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await response.json();

  return {
    props: {
      initialCocktails: data.drinks.slice(0, 8), // Initial 8 cocktails
      category,
    },
  };
};