export default (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      const base64Image = e.target!.result;
      resolve(base64Image as string);
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
};
