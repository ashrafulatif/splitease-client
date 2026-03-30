
import SubscriptionView from "@/components/module/Admin/Subscription/SubscriptionView";
import { SubscriptionServices } from "@/service/subscription.service";


const AdminSubscriptionPage = async () => {
  const { data: subscriptions = [] } = await SubscriptionServices.getAllSubscriptions();

  return <SubscriptionView subscriptions={subscriptions || []} />;
};

export default AdminSubscriptionPage;
