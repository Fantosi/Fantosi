import { ImageInfo, PhotoCardInfo } from "../types";

const fetchNftImg = async (metadataURI: string) =>
  new Promise<ImageInfo | undefined>((resolve, reject) => {
    fetch(metadataURI, {
      method: "GET",
    })
      .then((response) => {
        // console.log("Response", response);
        if (response.status === 404) {
          console.log("fetchNftImg - 404 error!");
          reject();
        }
        return response.json();
      })
      .then((data) => {
        // console.log("data", data);
        resolve(data as ImageInfo);
      })
      .catch((e) => {
        console.log(e);
        reject(undefined);
      });
  });

export const getNftImgInfos = async (photoCardInfos: PhotoCardInfo[]) => {
  const imageInfos: any[] = [];
  for (let i = 0; i < photoCardInfos.length; i++) {
    const photoCardInfo = photoCardInfos[i];
    if (photoCardInfo && photoCardInfo.metadataURI) {
      const imageInfo = await fetchNftImg(photoCardInfo.metadataURI);
      if (imageInfo) imageInfos.push(imageInfo);
    }
  }
  return imageInfos;
};
