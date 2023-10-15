type UploadResponse = {
  url: string
}

export default function uploadImage(image: File): Promise<UploadResponse> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (event) => {
      const base64Image = event.target!.result;
      if (!base64Image) throw new Error('Something is wrong the image');
      fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64Image }),
      })
        .then((response) => {
          if (response.ok) return resolve(response.json());
          reject(new Error('Image upload failed'));
          throw new Error('Image upload failed');
        })
        .then((data) => data)
        .catch((error) => {
          reject(error);
        });
    };
  });
}
