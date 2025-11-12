# Dokumentasi Sesi Perbaikan & Peningkatan (12 November 2025)

Dokumen ini merangkum semua pekerjaan yang dilakukan untuk menstabilkan proyek, memperbaiki serangkaian error, dan berhasil melakukan build produksi (`npm run build`).

## Tujuan Utama

Tujuan dari sesi ini adalah untuk mengatasi semua error yang tercatat di `error.txt` dan `note.txt`, yang muncul akibat proses upgrade dari Next.js 14 ke Next.js 16. Tujuannya adalah mencapai kondisi di mana proyek dapat di-build tanpa error.

---

## Daftar Error, Analisis, dan Solusi

Berikut adalah rincian masalah yang dihadapi dan langkah-langkah yang diambil untuk menyelesaikannya.

### 1. Error: `Module not found: Can't resolve 'fs'`

- **Analisis:** Error ini terjadi karena modul `fs` (File System) milik Node.js, yang hanya berjalan di sisi server, coba diimpor dan dijalankan di sisi client. Ini disebabkan oleh file `src/lib/events.ts` yang menggunakan `fs` diimpor ke dalam komponen halaman (`src/app/events/page.tsx`) yang pada saat itu merupakan Client Component.
- **Solusi:**
    1.  Mengubah `src/app/events/page.tsx` dari Client Component menjadi **Server Component**. Ini dilakukan dengan menghapus direktif `'use client'` dan mengubah fungsi komponen menjadi `async`.
    2.  Dengan menjadikannya Server Component, pemanggilan fungsi `getEvents()` yang menggunakan `fs` dieksekusi sepenuhnya di server, sehingga tidak lagi menyebabkan error di client.
    3.  Menambahkan direktif `'use server'` di bagian atas file `src/lib/events.ts` sebagai praktik terbaik untuk memastikan isinya hanya dieksekusi di server.

### 2. Error: `params` adalah Promise di Komponen Dinamis

- **Analisis:** Pada halaman dengan rute dinamis (contoh: `/e/[slug]`, `/book/[id]`), prop `params` yang diterima oleh komponen tidak langsung berisi nilai, melainkan sebuah `Promise`. Mencoba mengakses `params.slug` secara langsung menghasilkan `undefined` saat runtime, meskipun TypeScript tidak menunjukkan error saat build. Ini adalah perubahan perilaku di versi Next.js yang lebih baru.
- **Solusi:**
    - **Untuk Server Component (contoh: `src/app/news/[slug]/page.tsx`):**
        - Komponen diubah menjadi `async function Page({ params })`.
        - Nilai `params` "ditunggu" (awaited) sebelum digunakan: `const resolvedParams = await params;`.
    - **Untuk Client Component (contoh: `src/app/book/[id]/page.tsx`):**
        - Menggunakan `params` dari props terbukti tidak stabil dan menyebabkan konflik antara pengecekan tipe saat build dan perilaku saat runtime.
        - Solusi kanonikal dan paling stabil adalah dengan menggunakan hook `useParams()` dari `next/navigation`.
        - Semua halaman dinamis yang merupakan Client Component (`book`, `checkout`, `pay`, `status`, `dashboard/pesanan`, `dashboard/transaksi`) di-refactor untuk mendapatkan parameter rute menggunakan `useParams()`.

### 3. Error Build: `You're importing a component that needs...` & `Hook only works in a Client Component`

- **Analisis:** Setelah refactor untuk menggunakan `useParams()`, proses build gagal. Ini karena banyak komponen halaman yang sekarang menggunakan hooks (seperti `useParams`, `useState`) tetapi belum ditandai secara eksplisit sebagai Client Component.
- **Solusi:**
    - Secara sistematis, direktif `'use client';` ditambahkan di baris paling atas pada setiap file komponen yang menggunakan hooks sisi client.
    - Proses ini juga sekaligus memperbaiki banyak error `import` yang hilang akibat refactoring sebelumnya.

### 4. Error di Halaman Admin (`/admin/bookings` & `/admin/events`)

- **Analisis:** Halaman admin memiliki beberapa masalah:
    1.  **`Button is not defined`**: Komponen UI seperti `Button`, `Card`, `DropdownMenu` digunakan tanpa diimpor terlebih dahulu.
    2.  **`Functions cannot be passed to Client Components`**: Halaman admin awalnya adalah Server Component yang mencoba memberikan fungsi `render` sebagai prop ke komponen `<ResponsiveTable>` yang merupakan Client Component. Ini adalah pelanggaran aturan arsitektur Next.js.
- **Solusi:**
    1.  Menambahkan semua pernyataan `import` yang diperlukan untuk komponen UI yang hilang.
    2.  Mengubah halaman `/admin/bookings` dan `/admin/events` menjadi **Client Component** dengan menambahkan `'use client';`. Ini memungkinkan mereka untuk menggunakan state, hooks, dan memberikan fungsi sebagai props ke komponen anak lainnya yang juga merupakan Client Component.

### 5. Error TypeScript: Tipe `columns` tidak cocok di `ResponsiveTable`

- **Analisis:** Proyek menggunakan TypeScript yang ketat. Komponen `<ResponsiveTable>` mengharapkan prop `columns` dengan tipe di mana properti `key` harus merupakan `keyof` dari tipe data yang diberikan (misal `keyof Booking`), bukan `string` biasa. Selain itu, penggunaan `as const` pada array `columns` membuatnya menjadi `readonly`, yang tidak kompatibel dengan tipe yang diharapkan oleh prop komponen.
- **Solusi:**
    1.  Memperbaiki `key` yang tidak valid (misal: `actions` diubah menjadi `id` yang ada di tipe data).
    2.  Mendefinisikan tipe untuk variabel `columns` secara eksplisit, alih-alih menggunakan `as const`. Contoh: `const columns: { key: keyof Booking; label: string; ... }[] = [...]`. Ini memastikan tipe array yang dibuat cocok (mutable) dengan yang diharapkan oleh komponen.
    3.  Solusi ini diterapkan pada `src/app/admin/bookings/page.tsx` dan `src/app/admin/events/page.tsx`.

### 6. Peringatan di Console Browser

- **Analisis:**
    1.  **Framer Motion:** Peringatan `motion() is deprecated` muncul karena penggunaan HOC (Higher-Order Component) `motion()` yang sudah usang.
    2.  **Recharts:** Peringatan tentang dimensi chart (lebar/tinggi 0 atau -1) muncul karena konflik styling. Class `aspect-video` dari Tailwind CSS bentrok dengan cara Recharts menghitung ukuran kontainernya.
- **Solusi:**
    1.  **Framer Motion:** Komponen `src/components/shared/AnimatedSection.tsx` di-refactor untuk menggunakan sintaks JSX modern: `<motion.section>` sebagai ganti dari `motion(Section)`.
    2.  **Recharts:** Class `aspect-video` dihapus dari `div` yang membungkus `ChartContainer` di `src/components/ui/chart.tsx`, memungkinkan chart untuk mengambil ukuran dari parent-nya dengan benar.

---

## Hasil Akhir

Setelah semua perbaikan di atas diterapkan, perintah `npm run build` berhasil dijalankan tanpa error. Proyek sekarang berada dalam kondisi stabil dan siap untuk pengembangan lebih lanjut.

## Daftar File yang Diubah

- `src/lib/events.ts`
- `src/app/events/page.tsx`
- `src/app/e/[slug]/page.tsx`
- `src/app/news/[slug]/page.tsx`
- `src/components/shared/AnimatedSection.tsx`
- `src/components/ui/chart.tsx`
- `src/app/admin/bookings/page.tsx`
- `src/app/admin/events/page.tsx`
- `src/app/book/[id]/page.tsx`
- `src/app/checkout/[id]/page.tsx`
- `src/app/pay/[id]/page.tsx`
- `src/app/status/[code]/page.tsx`
- `src/app/dashboard/pesanan/[id]/page.tsx`
- `src/app/dashboard/transaksi/[id]/page.tsx`
