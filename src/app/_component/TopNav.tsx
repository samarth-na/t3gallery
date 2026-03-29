'use client';

import { Show } from '@clerk/nextjs';
import { SignInButton, UserButton } from '@clerk/nextjs';

export function TopNav() {
    return (
        <nav className="flex items-center justify-between w-full p-4 bg-green-50 text-xl  font-semibold">
            <div>T3gallery</div>
            <div>
                <Show when="signed-in" fallback={<SignInButton />}>
                    <UserButton />
                </Show>
            </div>
        </nav>
    );
}
