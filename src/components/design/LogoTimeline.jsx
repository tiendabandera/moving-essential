import { clsx } from "clsx";
//import { Mark } from "./logo";
function Row({ children }) {
  return (
    <div className="group relative">
      <div className="absolute inset-x-0 top-1/2 h-0.5 bg-linear-to-r from-gray-300 from-[2px] to-[2px] bg-[length:12px_100%]" />
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-linear-to-r from-gray-200/70 from-[2px] to-[2px] bg-[length:12px_100%] " />
      {children}
    </div>
  );
}

function Logo({ label, src, className }) {
  return (
    <div
      className={clsx(
        className,
        "absolute top-2 grid grid-cols-[1rem_1fr] items-center gap-2 px-3 py-1 whitespace-nowrap",
        "rounded-full bg-linear-to-t from-gray-300 from-50% to-gray-100 ring-1 ring-gray-20/10 ring-inset",
        "[--move-x-from:-100%] [--move-x-to:calc(100%+100cqw)] [animation-iteration-count:infinite] [animation-name:move-x] [animation-play-state:paused] [animation-timing-function:linear] group-hover:[animation-play-state:running]"
      )}
    >
      <img alt="" src={src} className="size-4" />
      <span className="text-sm/6 font-medium">{label}</span>
    </div>
  );
}

export function LogoTimeline() {
  return (
    <div aria-hidden="true" className="relative h-full overflow-hidden">
      <div className="[container-type:inline-size] absolute inset-0 grid grid-cols-1 pt-8">
        <Row>
          <Logo
            label="Facebook"
            src="/assets/img/logo-timeline/facebook.svg"
            className="[animation-delay:-26s] [animation-duration:30s]"
          />
          <Logo
            label="Linkedin"
            src="/assets/img/logo-timeline/linkedin.svg"
            className="[animation-delay:-8s] [animation-duration:30s]"
          />
        </Row>
        <Row>
          <Logo
            label="TikTok"
            src="/assets/img/logo-timeline/tiktok.svg"
            className="[animation-delay:-40s] [animation-duration:40s]"
          />
          <Logo
            label="Instagram"
            src="/assets/img/logo-timeline/instagram.svg"
            className="[animation-delay:-20s] [animation-duration:40s]"
          />
        </Row>
        <Row>
          <Logo
            label="Youtube"
            src="/assets/img/logo-timeline/youtube.svg"
            className="[animation-delay:-10s] [animation-duration:40s]"
          />
          <Logo
            label="Whatsapp"
            src="/assets/img/logo-timeline/whatsapp.svg"
            className="[animation-delay:-32s] [animation-duration:40s]"
          />
        </Row>
        <Row>
          <Logo
            label="Snapchat"
            src="/assets/img/logo-timeline/snapchat.svg"
            className="[animation-delay:-45s] [animation-duration:45s]"
          />
          <Logo
            label="Discord"
            src="/assets/img/logo-timeline/discord.svg"
            className="[animation-delay:-23s] [animation-duration:45s]"
          />
        </Row>
        <Row>
          <Logo
            label="Messenger"
            src="/assets/img/logo-timeline/messenger.svg"
            className="[animation-delay:-55s] [animation-duration:60s]"
          />
          <Logo
            label="Slack"
            src="/assets/img/logo-timeline/slack.svg"
            className="[animation-delay:-20s] [animation-duration:60s]"
          />
        </Row>
        <Row>
          <Logo
            label="Pinterest"
            src="/assets/img/logo-timeline/pinterest.svg"
            className="[animation-delay:-9s] [animation-duration:40s]"
          />
          <Logo
            label="Reddit"
            src="/assets/img/logo-timeline/reddit.svg"
            className="[animation-delay:-28s] [animation-duration:40s]"
          />
        </Row>
      </div>
    </div>
  );
}
