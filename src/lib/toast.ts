import { toaster } from "@/components/ui/toaster"

export const toast = {

  error: (title: string, description: string, position: string = 'top-right') => {
    toaster.create({
      title,
      description,
      type: 'error'
    })
  },
};
