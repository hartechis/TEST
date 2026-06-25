//functions/api/auth/set-password.js

import { getCorsHeaders } from '../../cors.js';
import { hashPassword } from '../../auth.js';

export async function onRequestPost(context) {
    const { request, env } = context;
    const { employee_id, new_password } = await request.json();
    const hashed = await hashPassword(new_password);
    
    await env.DB.prepare("UPDATE employees SET password_hash = ?, initial_password_set = 1 WHERE employee_id = ?")
        .bind(hashed, employee_id).run();
        
    return new Response(JSON.stringify({ status: "success" }), { status: 200, headers: { ...getCorsHeaders(), "Content-Type": "application/json" } });
}
