import { Empty, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";

const LoadingPostLogin = () => {
  return (
    <div className="grid min-h-screen grid-cols-1">
      <Empty>
        <EmptyHeader>
          <Spinner />
          <EmptyTitle className="text-sm">Please wait...</EmptyTitle>
        </EmptyHeader>
      </Empty>
    </div>
  );
};

export default LoadingPostLogin;
