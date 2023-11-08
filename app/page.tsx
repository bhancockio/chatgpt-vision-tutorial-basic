import ChatContainer from "./components/ChatContainer";
import Introduction from "./components/Introduction";

export default function Home() {
  return (
    <main
      className="flex flex-col items-center justify-center w-full min-h-screen p-4 gap-4 md:flex-row md:p-8"
      style={{
        backgroundImage: `url('/images/cool_ai_bg.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-xl mx-auto mb-4 md:mb-0 md:w-1/2 md:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
        <div className="card bg-white p-6 shadow-lg rounded-lg md:mb-0 md:mr-4 h-fit md:h-[85vh]">
          <Introduction />
        </div>
      </div>
      <div className="w-full max-w-xl mx-auto md:w-1/2 md:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
        <div className="card bg-white p-6 shadow-lg rounded-lg h-[85vh]">
          <ChatContainer />
        </div>
      </div>
    </main>
  );
}
