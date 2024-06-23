import Banner from "../components/Banner";
import BookList from "../components/BookList";

function Home() {
  return (
    <div className="container">
      <Banner />
      <BookList></BookList>
    </div>
  );
}

export default Home;
