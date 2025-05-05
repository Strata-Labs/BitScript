export const TaprootTemplateTable = () => {
  const templateData: {
    title: string;
    description: string;
    tapLeafs: number;
    inputsRequired: number;
  }[] = [
    {
      title: "template 0",
      description: "description for template 0",
      tapLeafs: 2,
      inputsRequired: 2,
    },
    {
      title: "template 1",
      description: "description for template 1",
      tapLeafs: 3,
      inputsRequired: 3,
    },
    {
      title: "template 2",
      description: "description for template 2",
      tapLeafs: 4,
      inputsRequired: 4,
    },
    {
      title: "template 3",
      description: "description for template 3",
      tapLeafs: 5,
      inputsRequired: 5,
    },
    {
      title: "template 4",
      description: "description for template 4",
      tapLeafs: 6,
      inputsRequired: 6,
    },
  ];

  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="w-full overflow-hidden">
          <p className="my-4">
            Select
            <span className="text-dark-orange"> Template </span>
            P2TR Output | Taproot Public Key
          </p>
          <div className="overflow-x-auto bg-dark-purple p-5">
            <table className="w-full table-auto">
              <colgroup>
                <col style={{ width: "15%" }} />
                <col style={{ width: "75%" }} />
                <col style={{ width: "5%" }} />
                <col style={{ width: "5%" }} />
              </colgroup>
              <thead>
                <tr className="bg-lighter-dark-purple">
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-xs font-light text-[#687588] sm:pl-3"
                  >
                    <div className="flex items-center gap-1">
                      <span>Title</span>
                      <img src="/drop-down.svg" alt="" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-xs font-light text-[#687588]"
                  >
                    <div className="flex items-center gap-1">
                      Description
                      <img src="/drop-down.svg" alt="" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-xs font-light text-[#687588]"
                  >
                    <div className="flex items-center gap-1">
                      Tapleafs
                      <img src="/drop-down.svg" alt="" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-xs font-light text-[#687588]"
                  >
                    <div className="flex items-center gap-1">
                      InputRequired
                      <img src="/drop-down.svg" alt="" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {templateData.map((data, i) => (
                  <tr key={i}>
                    <td className="py-4 pl-4 pr-3 text-sm font-light  sm:pl-3">
                      {data.title}
                    </td>
                    <td className="px-3 py-4 text-xs font-light">
                      {data.description}
                    </td>
                    <td className="px-3 py-4 text-xs font-light">
                      {data.tapLeafs}
                    </td>
                    <td className="px-3 py-4 text-xs font-light">
                      {data.inputsRequired}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaprootTemplateTable;

//   style={{
//     // maxHeight: "5em",
//     display: "-webkit-box",
//     WebkitLineClamp: 2,
//     WebkitBoxOrient: "vertical",
//   }}
