'use client'
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import cardGames from "@/data/cardGames";


export default function Favourites() {
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true);
  const [userFavourites, setUserFavourites] = useState<string[]>([]);

  console.log('client session', session)
  console.log('client status ', status)

  useEffect(() => {
    console.log('gonna fetch')
    const fetchFavourites = async (email: string) => {
      try {
        const response = await fetch(`/api/favourites/get?email=${email}`);
        const data = await response.json();

        if(response.ok){
          setUserFavourites(data.favourites); // Set the response data
        } else {
          console.error('Error:', data.message);
        }
        // console.log(userFavourites)
      } catch (error) {
        console.error('Error fetching user favourites:', error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated" && session.user?.email) {
      fetchFavourites(session.user.email as string);
    } else if (localStorage.getItem("cardMasterFavs")) {
      const favs = localStorage.getItem("cardMasterFavs");
      if(favs){
        setUserFavourites(JSON.parse(favs));
      }
    }

  }, [status, session])

  useEffect(() => {
    console.log(userFavourites, 'userFavd')
  },[userFavourites])

  

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <h1 className="text-4xl font-bold text-center mt-2 mb-6">Favourites</h1>
      <h2 className="text-m font-bold text-center mt-2 mb-6">Sign up to permanently store your favourite games</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
        {userFavourites.map((fav, index) => {
          let objective = '';
          cardGames.forEach(cardGame => {
            if(cardGame.name === fav){
              objective = cardGame.objective
            }
          })
          return (
            <div className="card bg-primary text-primary-content w-96" key={index}>
              <div className="card-body">
                <h2 className="card-title">{fav}</h2>
                <p>{objective}</p>
                <div className="card-actions justify-end">
                  <Link href={`/games/${fav.toLowerCase()}`} className="btn">View Rules</Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <Link className="btn" href='/' >Home</Link>
    </main>
  )
}