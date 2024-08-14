export default function PhraseSection() {
  return (
    <section className="flex justify-center w-full bg-blue-600 md:py-[7rem] py-[8rem] lg:py-[10rem] my-16 px-2 leading-[3rem] relative overflow-hidden shadow-md">
      <img src="/landing-phrase-bg.jpg" alt="" className="absolute top-0 left-0 object-fit-cover w-full h-full opacity-15" />
      <blockquote
        title="Eslogan de PlaSeC"
        className=" text-white text-4xl lg:text-[80px] font-sans-accent italic z-10"
      >
        <p>La seguridad la hacemos entre todos</p>
      </blockquote>
    </section>
  );
}
