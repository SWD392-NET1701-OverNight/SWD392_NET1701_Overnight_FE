import { useUploadImage } from '../../hooks/useUploadImage'

function RequestDesign() {
  const { hanldeUpload, imageUrl } = useUploadImage()
  function handleSubmit(e) {
    e.preventDefault()
  }
  return (
    <div className="flex px-[14%] pt-[50px]">
      <div className="w-[40%]">
        {imageUrl && (
          <img
            src={imageUrl}
            alt="design"
            className="image h-[400px] w-[400px] rounded-xl"
            onClick={() => {
              hanldeUpload()
            }}
          />
        )}
        {!imageUrl && (
          <div className="h-[400px] w-[400px] rounded-xl bg-gray-200">
            <div className="flex h-full items-center justify-center">
              <button
                className="btn text-xl text-gray-500"
                onClick={() => {
                  hanldeUpload()
                }}
              >
                Upload Design
              </button>
            </div>
          </div>
        )}
      </div>
      {/* <div className="">
        <input type="text" placeholder="Description" className="input" />
      </div> */}
    </div>
  )
}

export default RequestDesign
