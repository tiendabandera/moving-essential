import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { memo, useState } from "react";

import {
  FaCheckCircle,
  FaFacebookSquare,
  FaWhatsappSquare,
} from "react-icons/fa";
import { MdEmail, MdSms } from "react-icons/md";
import { IoCopy } from "react-icons/io5";

const ShareCompany = memo(({ company, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!company) return null;

  const businessType =
    company.business_type_id === 1 ? "local-moving" : "realtors";

  const shareLink = `${window.location.origin}/${businessType}/${company.id}`;

  /* FUNCTIONS
  _________________________________________ */
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Ocultar el mensaje después de 2s
    } catch (err) {
      console.error("Error copying link: ", err);
    }
  };

  const handleWhatsappShare = async () => {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(shareLink)}`
    );
  };

  const handleSMSShare = async () => {
    window.open(`sms:?body=${encodeURIComponent(shareLink)}`);
  };

  const handleEmailShare = async () => {
    window.open(`mailto:?body=${encodeURIComponent(shareLink)}`);
  };

  const handleFacebookShare = async () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareLink
      )}`
    );
  };

  /* BUTTONS
  _________________________________________ */

  const buttons = [
    {
      icon: IoCopy,
      name: "Copy link",
      onClick: handleCopyLink,
    },
    {
      icon: MdEmail,
      name: "Email",
      onClick: handleEmailShare,
    },
    {
      icon: FaWhatsappSquare,
      name: "Whatsapp",
      onClick: handleWhatsappShare,
    },
    {
      icon: FaFacebookSquare,
      name: "Facebook",
      onClick: handleFacebookShare,
    },
    {
      icon: MdSms,
      name: "SMS",
      onClick: handleSMSShare,
    },
  ];

  return (
    <Dialog open={!!company} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Share with your friends
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex flex-col gap-5 p-2">
          <div className="flex items-center justify-center gap-2 md:justify-start">
            <img
              src={company.images[0]}
              alt=""
              className="w-[50px] h-[50px] rounded-lg object-cover border border-gray-100/60"
            />
            <p className="font-medium text-base">{company.company_name}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {buttons.map((button) => (
              <Button
                key={button.name}
                className="border border-gray-400 bg-transparent text-black shadow-none py-5 hover:bg-gray-300/40"
                onClick={button.onClick}
              >
                {<button.icon className="w-6! h-6!" color="#000000" />}{" "}
                {button.name}
              </Button>
            ))}
          </div>
          {copied && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg px-4 py-2 text-sm font-semibold transition-opacity duration-300">
              <div className="flex gap-2">
                <FaCheckCircle className="w-5! h-5!" color="green" /> Link
                copied!
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
});

ShareCompany.displayName = "ShareCompany";

export default ShareCompany;
