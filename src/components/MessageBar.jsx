import useGetConversations from "../hooks/useGetConversations";
import toggleMessagebar from "../zustand/toggleMessagebar";
import NameCard from "./NameCard";

const MessageBar = () => {
  const { loading, conversations } = useGetConversations();

  const { open, toggleState } = toggleMessagebar();

  return (
    <>
      <div
        className={`text-text-light-1 dark:test-text-dark-1 bg-light-1 dark:bg-dark-2 border-2 dark:border-dark-5 m-3 p-3 rounded-xl ${
          open && "w-[320px]"
        }`}
      >
        <div>
          <div
            className={`flex ${open ? " justify-between" : " justify-center"}`}
          >
            {open && <h1>Message</h1>}
            <div>
              <img
                src={
                  open
                    ? "assets/icons/open-single-arrow.svg"
                    : "assets/icons/close-single-arrow.svg"
                }
                alt=""
                className="w-6 bg-slate-200 rounded-full cursor-pointer"
                onClick={() => toggleState(!open)}
              />
            </div>
          </div>
          <div className="w-full">
            {conversations.map((conversation) => (
              <NameCard key={conversation._id} data={conversation} />
            ))}
            {loading ? (
              <img src="assets/icons/loading.svg" className="w-8" />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageBar;
