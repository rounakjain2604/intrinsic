import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <SignIn
                    appearance={{
                        elements: {
                            rootBox: "mx-auto",
                            card: "bg-[#F5F1EA] border border-[#2D2A26]/10 rounded-2xl shadow-[0_2px_12px_rgba(45,42,38,0.06)]",
                            headerTitle: "font-[family-name:var(--font-serif)] text-[#2D2A26]",
                            headerSubtitle: "text-[#6B6560]",
                            formButtonPrimary: "bg-[#E8694A] hover:bg-[#D45E40] shadow-[0_2px_8px_rgba(232,105,74,0.25)]",
                            footerActionLink: "text-[#E8694A] hover:text-[#D45E40]",
                        },
                    }}
                />
            </div>
        </div>
    );
}
