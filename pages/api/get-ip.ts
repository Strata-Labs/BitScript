export default function handler(
  req: { headers: { [x: string]: any }; connection: { remoteAddress: any } },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { ip: any }): void; new (): any };
    };
  }
) {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  res.status(200).json({ ip });
}
