'use client'
import download from 'downloadjs';
import { toPng } from 'html-to-image';
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const ref = useRef<HTMLDivElement>(null)
  const [userImageUrl, setUserImageUrl] = useState<string>();
  const [unsuportedBrowser, setUnsupportedBrowser] = useState(false)

  useEffect(() => {
    const isInstagramBrowser = /Instagram/i.test(navigator.userAgent);
    const isFacebookBrowser = /FBAN|FBAV/i.test(navigator.userAgent);

    if (isInstagramBrowser || isFacebookBrowser) {
      setUnsupportedBrowser(true)
    }
  }, [unsuportedBrowser])

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event: any) => {
      setUserImageUrl(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  const handleUploadButtonClick = () => {
    document.getElementById('fileInput')?.click();
  };

  const generateImage = async () => {
    try {
      return await toPng(ref.current as HTMLElement)
    } catch (e) {
      // console.log("e", e)
    }
  }

  const handleDownload = async () => {
    await generateImage()
    await generateImage()
    await generateImage()
    const generatedImageUrl = await generateImage()
    if (generatedImageUrl) {
      download(generatedImageUrl, "profile-pic.png")
    }
  };

  return (
    <main className='text-center px-8 py-12 max-w-lg mx-auto flex justify-center align-center items-center min-h-screen'>
      <div>
        {unsuportedBrowser && (
          <div className='border p-2 rounded-lg bg-yellow-200 my-2  text-sm mb-8'>
            <p className='font-semibold'>⚠️ Unsupported Browser Detected</p>
            <p>Please open on regular browsers like Chrome or Safari.</p>
          </div>
        )}
        <h1 className='font-semibold text-3xl'>Show Solidarity 🇵🇸</h1>
        <p className="text-lg py-2">Frame your profile picture with the colors of resilience. #IStandWithPalestine ✊</p>
        <div className="my-12">
          <div className='flex justify-center'>
            <div style={{ width: '300px', height: '300px' }} className="relative" ref={ref}>
              <img id="borderImage" src={"/bg.webp"} style={{ position: 'absolute', width: '100%', height: '100%' }} className="rounded-full" />
              <img id="userImage" alt='profile-image' src={userImageUrl ?? "/user.jpg"} style={{ position: 'absolute', width: '85%', height: '85%', left: '7.5%', top: '7.5%' }} className="border object-cover rounded-full cursor-pointer" />
            </div>
          </div>

        </div>
        <div>{userImageUrl && (
          <button onClick={handleDownload} className="rounded-full mb-2 py-4 px-2 w-full border border-gray-900 bg-gray-900 text-white text-xl">
            Download Image
          </button>
        )}
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="fileInput" />
          <button onClick={async () => await handleUploadButtonClick()} className="rounded-full my-2 py-4 px-2 w-full border border-gray-900 text-xl">
            Upload Image
          </button>
        </div>
        <div className='pt-4'>
          <p className="p-2 my-6 text-sm border rounded-lg">Note: This app runs purely on your browser end. No images nor data will be saved by the app.</p>
          <p className='text-gray-600'>Have any feedback? <a href='https://www.instagram.com/tengkuhafidz' target='_blank' className='underline cursor-pointer'>Let me know!</a></p>
        </div>
      </div>
    </main>
  )
}
