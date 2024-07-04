import { useEffect, useRef, useState } from 'react'

export function useUploadImage() {
  const cloudinaryRef = useRef()
  const widgetRef = useRef()
  const [imageUrl, setImageUrl] = useState()
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: 'dlrpmjdzz',
        uploadPreset: 'l5mgpnq4',
      },
      function (error, result) {
        if (result.event === 'success') {
          setImageUrl(result.info.secure_url)
        }
      },
    )
  }, [])
  return { hanldeUpload: () => widgetRef.current.open(), imageUrl, onSetImageUrl: setImageUrl }
}
