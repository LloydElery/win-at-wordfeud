import { SignIn } from "@clerk/nextjs";

const CustomSignIn = () => {
  return (
    <>
      <div>
        <SignIn
          routing="hash"
          appearance={{
            variables: {
              colorPrimary: "#D9D9D9", // Primär färg
              colorBackground: "#232325", // Bakgrundsfärg för hela komponenten
              borderRadius: "0px", // Rundade kanter
              spacingUnit: "13px", // Marginal och padding-enhet
            },
            elements: {
              rootBox: "",
              card: "login-panel", // Container (kort)
              headerTitle: "login-header<", // Titel på headern
              headerSubtitle: "text-sm font-light", // Undertitel i headern
              form: "space-y-0", // Form-styling, används för att lägga till spacing
              formField: "", // Wrapper för varje formfält
              formFieldLabel: "text-sm font-light text-letterTile", // Label för varje input
              formFieldInput: "border border-gray-300 rounded-md px-4 py-2", // Inputfältens stil
              formButtonPrimary:
                "bg-primaryBlue hover:bg-accentBlue text-white py-2 px-4 rounded", // Primär knapp (Logga in)
              formButtonSecondary:
                "bg-gray-100 text-gray-600 py-2 px-4 rounded", // Sekundär knapp (Ex: "Använd magisk länk")
              socialButtons: "flex bg-letterTile rounded-sm space-x-2", // Styling för sociala inloggningsknappar (Google, Facebook)
              socialButtonIcon: "mr-2", // Ikonen för sociala inloggningsknappar
              footerActionLink: "text-blue-500 hover:underline", // Länk för "Skapa konto"
              footerActionText: "text-letterTile", // Text för "Har du inget konto?"
              formFieldErrorText: "text-red-500 text-sm", // Felmeddelanden under fält
            },
            layout: {
              logoPlacement: "none", // Placering av logotyp (kan vara "inside" eller "none")
            },
          }}
        />
      </div>
    </>
  );
};

export default CustomSignIn;
