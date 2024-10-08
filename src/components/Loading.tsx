function Loading() {
  return (
    <div className="w-full h-full flex-col flex justify-center items-center my-20">
      <h1 className="text-xl md:text-3xl text-gray-700 font-semibold  mb-5">
        Loading Please wait.....
      </h1>
      <div className="md:w-20 w-12 aspect-square rounded-full border-4 md:border-8 border-black  border-b-transparent animate-spin"></div>
    </div>
  );
}

export default Loading;
