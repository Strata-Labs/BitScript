const PfpTeam = () => {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <img
          src="/Setzeus.png"
          alt="SetZeus"
          className="translate-x-[90px] translate-y-[50px]  xl:absolute xl:-translate-y-[100px] xl:translate-x-[100px] "
        />
      </div>

      <div className="flex flex-row">
        <img src="/SetBern.png" alt="SetBern" className="xl:absolute" />
        <img
          src="/SetPato.png"
          alt="SetPato"
          className="xl:absolute xl:translate-x-[200px]"
        />
      </div>
    </div>
  );
};

export default PfpTeam;
