import { Provider } from "@/components/ui/provider"

export const UIProvider = ({ children }: { children: React.ReactNode }) => (
  <Provider >
    {children}
  </Provider>
);
