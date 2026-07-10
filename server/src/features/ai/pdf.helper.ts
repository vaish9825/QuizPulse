import PDFParser from "pdf2json";

export function extractPdfText(
  buffer: Buffer
): Promise<string> {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on(
      "pdfParser_dataError",
      (errData: any) => {
        reject(errData.parserError);
      }
    );

    pdfParser.on(
      "pdfParser_dataReady",
      (pdfData: any) => {
        let text = "";

        pdfData.Pages.forEach((page: any) => {
          page.Texts.forEach((item: any) => {
            item.R.forEach((run: any) => {
              text += decodeURIComponent(run.T) + " ";
            });
          });

          text += "\n";
        });

        resolve(text);
      }
    );

    pdfParser.parseBuffer(buffer);
  });
}