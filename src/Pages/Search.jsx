import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { gameSearch } from "../api/FetchGames";
import { IoGameControllerOutline } from "react-icons/io5";
const Search = () => {
  const { term } = useParams();
  const { data, isloading } = useQuery({
    queryKey: ["search"],
    queryFn: () => gameSearch(term),
    staleTime: 3000,
  });
  console.log(data);
  if (isloading) return "loading..";
  return (
    <div>
      <h1 className="text-3xl py-3 font-semibold">
        Search About <span className="text-rose-500"> {term}</span>
      </h1>
      <div>
        {data?.map((res) => (
          <Link
            to={`/game/${res.id}`}
            className="px-3 py-6 rounded  hover:shadow-red-500 shadow-md flex gap-6 h-20 items-center"
            key={res.id}
          >
            <IoGameControllerOutline size={50} />
            <h2 className="text-2xl font-medium">{res.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Search;
