import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useUserDataStore } from "@/store/useUserDataStore";


type FormData = {
  name: string;
};

export function LoginForm() {
  const methods = useForm<FormData>({
    defaultValues: {
      name: "",
    },
  });
  const setName = useUserDataStore((state)=>(state.setName))
  const onSubmit = (data: FormData) => {

    if (data.name.length < 3) {
      alert("Name must be at least 3 characters.");
      methods.setValue("name", ""); // Reset the input
      return;
    }

    // 2. Check for alphanumeric characters only
    const isAlphanumeric = /^[a-zA-Z0-9]+$/.test(data.name);
    if (!isAlphanumeric) {
      alert("Name can only contain letters and numbers.");
      methods.setValue("name", ""); // Reset the input
      return;
    }

    // 3. Success state
    console.log("Submitted successfully:", data.name);
    setName(data.name)
    methods.reset(); 
  };
return (
    <Form {...methods}>
    <form className="flex" onSubmit={methods.handleSubmit(onSubmit)}>   
    <FormField
          control={methods.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="name" placeholder="your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
    <Button type="submit">Submit</Button>
    </form>
    </Form>
  )
}