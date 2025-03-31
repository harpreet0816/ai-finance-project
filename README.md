# Project Setup Guide

## 🛠️ Prisma Configuration

### Environment Setup
- Add your database URL to `.env`
- Prisma automatically loads env variables
- [Documentation](https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema)

### Supported Databases
PostgreSQL | MySQL | SQLite | SQL Server | MongoDB | CockroachDB  
[Connection String Guide](https://pris.ly/d/connection-strings)

## 🔥 Essential Prisma Commands

| Command | Action |
|---------|--------|
| `npm update prisma @prisma/client` | Update Prisma packages |
| `npx prisma db pull` | Sync DB schema → `schema.prisma` |
| `npx prisma generate` | Generate Prisma Client |
| `npx prisma migrate dev --name "init"` | Create & apply migration |
| `npx prisma studio` | Open DB GUI (localhost:5555) |
| `npx prisma migrate reset` | ⚠️ Reset database (DANGER) |

## 📝 Form Management
```bash
npm install react-hook-form zod @hookform/resolvers
react-hook-form: Handle form state

zod: Validate form data

@hookform/resolvers: Connect zod + react-hook-form

# 📌 Understanding useForm with Zod Validation  

This document explains the usage of `useForm` from **React Hook Form** along with **Zod validation** to manage form state, handle validation, and process user input efficiently.  

---

## 🚀 What Does This Code Do?  

This snippet initializes a form using `useForm` with **Zod validation**. It helps in:  
✔ Managing form state efficiently.  
✔ Validating form fields using Zod with `zodResolver`.  
✔ Providing utility functions to handle form operations like setting values, watching fields, and resetting the form.  

   const {register, handleSubmit, formState: { errors }, setValue, watch, reset,}   = useForm({
        resolver: zodResolver(accountSchema),
        defaultValues: {
            name: "",
            type: "CURRENT",
            balance: "",
            isDefault: false,
        }
    })

## 📌 Explanation of the Code  

### **1️⃣ Initializing the Form with `useForm`**  

- `useForm()` is a hook provided by React Hook Form that helps manage form states, validation, and submission.  
- The `resolver` property integrates **Zod validation** using `zodResolver(accountSchema)`.  
- The `defaultValues` property sets **initial values** for form fields.  

---

### **2️⃣ Breaking Down Each Property**  

#### **`register`**  
Registers an input field so that React Hook Form can track its value and validation status.  

#### **`handleSubmit`**  
Handles the form submission by preventing default behavior and running validation before executing the provided function.  

#### **`formState.errors`**  
Contains validation errors for the form fields. These errors can be displayed in the UI to inform users about incorrect inputs.  

#### **`setValue`**  
Allows updating a form field’s value programmatically, useful for pre-filling data.  

#### **`watch`**  
Tracks real-time changes in form fields, useful for live previews or conditional UI updates.  

#### **`reset`**  
Resets the form fields to their initial values, often used after form submission or when clearing input fields.  

---

## 🎯 Summary  

This setup helps in efficiently managing forms in React applications by combining React Hook Form with Zod for validation.  
It reduces re-renders, improves performance, and provides complete control over form operations.  

For more details, refer to:  
- [React Hook Form Documentation](https://react-hook-form.com/)  
- [Zod Validation](https://zod.dev/)  




⚡ Next.js Data Caching
When to Use?
After any database change (create/update/delete)

Methods:
revalidatePath("/route")

Refreshes entire page cache

// In Server Actions:
revalidatePath("/dashboard");
revalidateTag("tag") (More Precise)

// Tag your queries:
fetch(url, { next: { tags: ["posts"] } });

// Then refresh:
revalidateTag("posts");
router.refresh() (Instant Update)


"use client";
const router = useRouter();
router.refresh(); // Force client-side reload
🚀 Pro Tip
Combine these for best results:


// Server Action:
await createPost(data);
revalidatePath("/posts");
revalidateTag("latest-posts");

// Client Component:
router.refresh();