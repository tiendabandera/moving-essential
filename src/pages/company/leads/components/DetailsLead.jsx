import Input from "@/components/design/Input";
import TextArea from "@/components/design/TextArea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const DetailsLead = ({ record, isOpen, onClose }) => {
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Lead Detail</DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <Input
                id="name"
                name="name"
                label="Full name"
                type="text"
                readOnly
                value={record.full_name}
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Input
                id="email"
                name="email"
                label="Email"
                type="email"
                readOnly
                value={record.email}
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Input
                id="phone"
                name="phone"
                label="Phone"
                readOnly
                value={record.phone}
              />
            </div>
            <div className="col-span-2">
              <TextArea
                id="message"
                name="message"
                label="Message"
                readOnly
                value={record.message}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DetailsLead;
