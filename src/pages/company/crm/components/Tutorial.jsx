import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { titles, tutorials } from "@/constants/crm";

const Tutorial = ({ isOpen, onClose, platform }) => {
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{titles[platform]}</DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <div>
            <iframe
              width="100%"
              height="400"
              src={tutorials[platform]}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tutorial;
