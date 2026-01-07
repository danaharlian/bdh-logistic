import { Unauthorized } from "@/modules/auth/ui/components/unauthorized";

const UnauthorizedView = () => {
  return (
    <div className="grid min-h-screen">
      <Unauthorized />
    </div>
  );
};

export default UnauthorizedView;
