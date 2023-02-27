# Manual Guide User

[[toc]]

## I. Halaman Login

<img :src="$withBase('/images/page_login_user.jpeg')" alt="login" height="400" style="object-fit: contain;" />

### Masuk sebagai User

Untuk mengakses website, Anda wajib melakukan login terlebih dahulu. Anda dapat menggunakan akun yang telah dibuat oleh admin. Jika Anda belum memiliki akun, Anda dapat menghubungi admin untuk membuatkan akun untuk Anda. Untuk login cukup mengisi kolom `username` dan `password` sebagai kredensial. Jika kredensial yang Anda masukkan benar, Anda akan diarahkan ke halaman dashboard.

### Lupa Password

<img :src="$withBase('/images/page_login_reset.png')" alt="login reset account link" height="400" style="object-fit: contain;" />

Namun, bagaimana apabila Anda lupa password? **Pertama Anda harus menghubungi Admin terlebih dahulu untuk mereset akun Anda**. Setelah itu, Anda dapat mengklik link `Reset Account` yang berada di bawah button `Login`.

## II. Halaman Reset Account

<img :src="$withBase('/images/page_reset.jpeg')" alt="reset account" height="400" style="object-fit: contain;" />

Setelah Anda mengklik link `Reset Account`, Anda akan diarahkan ke halaman reset account. Pada halaman ini, Anda dapat mengubah password Anda dengan mengisi kolom `Username`, `Password` dan `Confirm New Password`. Anda juga dapat mengubah `Username` Anda dengan mengklik checkbox `Change Username` dan mengisi kolom `New Username`. **Pastikan format password harus terdiri minimal dari 8 karakter dan minimal memiliki 1 huruf besar, 1 huruf kecil, dan 1 angka**.

Setelah semua kolom terisi, Anda dapat mengklik button `Reset Account` untuk mengubah password dan username Anda. Apabila berhasil, akan muncul notifikasi success dan Anda akan diarahkan ke halaman login.

<img :src="$withBase('/images/page_reset_success.png')" alt="reset account success" height="400" style="object-fit: contain;" />

::: warning Ingat!
Jangan lupa menyimpan password baru yang telah Anda buat ke dalam password manager Anda untuk menghindari situasi yang sama berulang kali.
:::

## III. Halaman Dashboard

<img :src="$withBase('/images/dashboard/page.jpeg')" alt="dashboard" height="400" style="object-fit: contain;" />

Setelah berhasil login, Anda akan diarahkan ke halaman dashboard. Pada halaman ini, Anda dapat melihat beberapa informasi mengenai ringkasan dari aktivitas pada Squad Operation & Availability, departemen RTPO, Telkomsel Jateng-DIY. Informasi-informasi tersebut adalah:

### Ringkasan Aktivitas Berdasarkan Program

<img :src="$withBase('/images/dashboard/programs.png')" alt="dashboard programs summary" height="400" style="object-fit: contain;" />

Pada bagian ini, Anda dapat melihat ringkasan aktivitas berdasarkan program. Informasi yang ditampilkan adalah sebagai berikut:

- 1. **Nama Program**. Nama program yang ditampilkan adalah nama program yang ada di database
- 2. **Total <em style="color:rgb(22, 163, 74);">done</em> dan total <em style="color:#FF7723;">not yet</em>**. Anda dapat mengetahui perbandingan aktivitas yang sudah selesai dan belum selesai berdasarkan program
- 3. **Progress**. Selain itu, berdasarkan total <em style="color:rgb(22, 163, 74);">done</em> dan total <em style="color:#FF7723;">not yet</em>, Anda dapat mengetahui presentase aktivitas yang sudah selesai dan belum selesai berdasarkan program
- 4. **Button Reload**. Apabila Anda ingin melihat perubahan data terbaru, Anda dapat mengklik icon button `reload` di sebelah kanan atas

### 10 Aktivitas Terakhir

<img :src="$withBase('/images/dashboard/log_activities.png')" alt="dashboard log activities" height="300" style="object-fit: contain;" />

Pada bagian ini, Anda dapat melihat 10 aktivitas terakhir yang telah diupdate baik oleh admin maupun oleh user. Informasi yang ditampilkan adalah sebagai berikut:

- 1. **Nama Aktivitas**. Nama aktivitas yang sudah diupdate
- 2. **Nama Program**. Nama program yang memiliki aktivitas tersebut
- 3. **Nama Sub Program**. Nama sub program yang memiliki aktivitas tersebut
- 4. **Status**. Status terupdate dari aktivitas tersebut apakah sudah selesai yang Andai <strong style="color:rgb(22, 163, 74);">Done</strong>, atau belum selesai yang Andai <strong style="color:#FF7723;">Not Yet</strong>
- 5. **Tanggal**. Tanggal disaat aktivitas tersebut terjadi perubahan pada statusnya, atau disaat kapan aktivitas tersebut diinputkan
- 6. **Button Reload**. Apabila Anda ingin melihat perubahan data terbaru, Anda dapat mengklik icon button `reload` di sebelah kanan atas

### Ringkasan Aktivitas Tiap DO Berdasarkan Program, Sub Program, dan Target Quartal

<img :src="$withBase('/images/dashboard/activities.png')" alt="dashboard activities summary" height="400" style="object-fit: contain;" />

Pada bagian ini, Anda dapat melihat ringkasan aktivitas berdasarkan DO. Informasi yang ditampilkan adalah sebagai berikut:

#### 1. Button Reload

<img :src="$withBase('/images/dashboard/activities_reload.png')" alt="dashboard activities summary reload" height="70" style="object-fit: contain;" />

Apabila Anda ingin melihat perubahan data terbaru, Anda dapat mengklik icon button `reload` di sebelah kanan atas

#### 2. Filter

<img :src="$withBase('/images/dashboard/activities_filter.png')" alt="dashboard activities summary filter" height="100" style="object-fit: contain;" />

Secara default, Anda akan melihat ringkasan aktivitas tiap DO dengan program Alarm, beserta seluruh sub program yang ada di dalamnya dan seluruh target quartal yang ada di dalamnya. Jika Anda ingin melihat ringkasan aktivitas tiap DO dari program lain, Anda dapat mengganti program yang ditampilkan dengan mengklik dropdown `Program` dan memilih program yang Anda inginkan seperti ilustrasi di bawah ini:

<img :src="$withBase('/images/dashboard/activities_filter_program.png')" alt="filter program" height="150" style="object-fit: contain;" />

---

Secara default, pengaturan sub program akan menampilkan seluruh sub program yang ada di dalam program yang dipilih. Anda juga dapat melakukan filter sub program yang ada di dalam program yang dipilih dengan mengklik dropdown `Subprogram` dan memilih sub program yang Anda inginkan seperti ilustrasi di bawah ini:

<img :src="$withBase('/images/dashboard/activities_filter_subprogram.png')" alt="filter sub program" height="150" style="object-fit: contain;" />

---

Sama halnya dengan target quartal, secara default akan menampilkan seluruh target quartal. Namun, Anda juga dapat melakukan filter target quartal dengan mengklik dropdown `Target Quartal` dan memilih target quartal yang Anda inginkan seperti ilustrasi di bawah ini:

<img :src="$withBase('/images/dashboard/activities_filter_targetq.png')" alt="filter target quartal" height="150" style="object-fit: contain;" />

#### 3. Tabel Ringkasan Aktivitas Tiap DO

<img :src="$withBase('/images/dashboard/activities_table.png')" alt="dashboard activities summary table" height="200" style="object-fit: contain;" />

- 1. Pada kolom pertama, Anda dapat melihat nama aktivitas yang ada di dalam program yang dipilih
- 2. Pada kolom selanjutnya merupakan jumlah aktivitas yang sudah selesai(<strong style="color:rgb(22, 163, 74);">Done</strong>) dan belum selesai(<strong style="color:#FF7723;">Not Yet</strong>) berdasarkan DO
- 3. Pada kolom terakhir, Anda dapat mengetahui grand total dari aktivitas tersebut dari keseluruhan DO
- 4. Pada baris terakhir, Anda dapat mengetahui grand total dari DO terhadap keseluruhan aktivitas yang ada

## IV. Halaman Project Planner

<img :src="$withBase('/images/project-planner/page.jpeg')" alt="project planner" height="400" style="object-fit: contain;" />

Pada halaman ini, Anda dapat melihat progress dari seluruh aktivitas yang ada di Squad Operation & Availability. Informasi yang ditampilkan adalah sebagai berikut:

### Progress Activity per Bulan berdasarkan Program

<img :src="$withBase('/images/project-planner/progress.png')" alt="project planner progress" height="300" style="object-fit: contain;" />

Pada bagian ini, Anda dapat melihat perkembangan aktivitas yang telah dikerjakan berdasarkan program tiap bulannya.

### Tabel Project Planner

   <img :src="$withBase('/images/project-planner/table.jpeg')" alt="project planner table" height="300" style="object-fit: contain;" />

Pada bagian ini, Anda dapat melihat lebih detail informasi progress dari aktivitas berdasarkan program ditiap minggunya. Informasi yang ditampilkan adalah sebagai berikut:

#### 1. Deskripsi Kolom

- **Program**. Nama program yang memiliki aktivitas tersebut
- **Sub Program**. Nama sub program yang memiliki aktivitas tersebut
- **Activity**. Nama aktivitas yang terdapat di dalam program dan sub program
- **Target**. Total target dari aktivitas
- **Completed**. Persentase dari aktivitas yang telah selesai
- **Periods**. Informasi ini untuk menampilkan jumlah aktivitas yang telah selesai berdasarkan minggu, jika nilai dari kolom tersebut kosong artinya tidak ada aktivitas yang telah selesai pada minggu tersebut
- **PIC**. Nama dari PIC yang bertanggung jawab terhadap aktivitas tersebut
- **Budget**. Nama pemilik budget dari aktivitas tersebut
- **Cost**. Total biaya yang digunakan untuk aktivitas tersebut

#### 2. Keterangan Highlight yang Terdapat pada Kolom **Periods**

- <div style="background-color:rgb(253, 224, 71); width: 10px; height: 10px; display: inline-block;"></div> <strong>Week Highlight</strong>. Melakukan highlight dari minggu di dalam kolom <strong>Periods</strong>, Anda dapat mengubah week highlight dengan mengklik dropdown `Week ..` dan memilih minggu yang Anda inginkan seperti ilustrasi di bawah ini:

<img :src="$withBase('/images/project-planner/week.png')" alt="project planner week highlight" height="150" style="object-fit: contain;" />

- <div style="background-color:rgb(243, 232, 255); width: 10px; height: 10px; display: inline-block;"></div> <strong>Plan Duration</strong>. MenAndakan durasi dari aktivitas yang telah dijadwalkan
- <div style="background-color:rgb(216, 180, 254); width: 10px; height: 10px; display: inline-block;"></div> <strong>Actual Start</strong>. MenAndakan pada minggu ke berapa aktivitas tersebut dimulai dalam rentang durasi dari rencana yang telah dijadwalkan
- <div style="background-color:rgb(147, 51, 234); width: 10px; height: 10px; display: inline-block;"></div> <strong>Actual End</strong>. MenAndakan pada minggu ke berapa aktivitas tersebut selesai dalam rentang durasi dari rencana yang telah dijadwalkan
- <div style="background-color:rgb(253, 186, 116); width: 10px; height: 10px; display: inline-block;"></div> <strong>Beyond Actual Start</strong>. MenAndakan bahwa aktivitas tersebut dimulai diluar rentang durasi dari rencana yang telah dijadwalkan
- <div style="background-color:rgb(234, 88, 12); width: 10px; height: 10px; display: inline-block;"></div> <strong>Beyond Actual End</strong>. MenAndakan bahwa aktivitas tersebut selesai diluar rentang durasi dari rencana yang telah dijadwalkan

## V. Halaman Plan Activities

<img :src="$withBase('/images/plan-activities/page.jpeg')" alt="plan activities" height="400" style="object-fit: contain;" />

Pada halaman ini, Anda dapat melihat seluruh aktivitas yang ada di Squad Operation & Availability. Selain itu, Anda juga dapat melakukan beberapa hal seperti:

- Filter & Sorting tabel per kolom
- Update status dari `plan activity` baik satu per satu maupun secara massal
- Mengedit data `plan activity`

Untuk lebih lanjut, mari simak penjelasan berikut ini:

### 1. Sorting & Filter tabel per kolom

#### 1. Sorting

<img :src="$withBase('/images/plan-activities/sorting.png')" alt="plan activities sorting table" height="100" style="object-fit: contain;" />

Untuk melakukan sorting pada kolom tertentu, Anda dapat mengklik ikon <span style="font-size:10px">&#9650;</span> urut secara ascending (A-Z) atau ikon <span style="font-size:10px;">&#9660;</span> urut secara descending (Z-A) yang berada di sebelah kanan header kolom

::: warning Ingat!
Pengimplementasian sorting hanya bisa dilakukan untuk satu kolom. Jika anda mengklik kolom yang berbeda, otomatis kolom yang telah disorting sebelumnya akan hilang dan tabel melakukan sorting untuk kolom yang dipilih.
:::

#### 2. Filter

<img :src="$withBase('/images/plan-activities/filter.png')" alt="plan activities filter table" height="300" style="object-fit: contain;" />

Untuk melakukan filter pada kolom tertentu, Anda dapat mengklik ikon <strong>&#8230;</strong> yang berada di sebelah kanan header kolom. Setelah itu, Anda dapat menselect data yang ingin Anda filter dengan mengklik checkbox yang terdapat di sebelah kiri data tersebut. Anda juga dapat melakukan filter dengan mengetikkan kata kunci yang ingin Anda cari melalui input text.

Apabila Anda ingin melihat hasil filter yang telah Anda buat, Anda dapat mengklik button `Apply`. Sebaliknya, jika Anda ingin menghapus filter yang telah Anda buat, Anda dapat mengklik button `Reset`.

<img :src="$withBase('/images/plan-activities/filter_success.png')" alt="plan activities filter table success" height="300" style="object-fit: contain;" />

Setelah melakukan filter, data-data yang ditampilkan pada tabel akan berubah sesuai dengan filter yang Anda buat. Begitupun dengan data pada pencarian filter, data tersebut juga akan berubah menyesuaikan kondisi filter yang Anda buat.

### 2. Update status `plan activity`

<img :src="$withBase('/images/plan-activities/update_status.png')" alt="plan activities update status" height="300" style="object-fit: contain;" />

Anda dapat melakukan update status dari `plan activity` dengan mengklik tag status sesuai baris yang ingin Anda update. Setelah itu, Anda dapat memilih status <strong style="color:rgb(22, 163, 74);">Done</strong>, atau <strong style="color:#FF7723;">Not Yet</strong> yang terdapat pada dropdown menu yang muncul. Apabila Anda mengklik status <strong style="color:rgb(22, 163, 74);">Done</strong>, maka Anda harus mengisi tanggal dieksekusinya status tersebut.

Apabila berhasil melakukan update status, maka status yang Anda pilih akan berubah sesuai dengan status yang Anda pilih. Dan kolom updated by, date executed, dan week executed akan terisi otomatis.

<img :src="$withBase('/images/plan-activities/update_status_success_user.png')" alt="plan activities update status success" height="200" style="object-fit: contain;" />

### 3. Update status `plan activity` secara massal

Sebelum ingin melakukan update status secara massal, Anda harus memilih data yang ingin Anda update statusnya dengan mengklik checkbox yang terdapat di sebelah kiri data tersebut. Selain mengklik satu per satu, Anda juga dapat mengklik button `Select All` untuk memilih semua data yang ada pada tabel di halaman tersebut atau mengklik button `Reset Checkbox` untuk membatalkan pilihan data yang telah Anda buat pada tabel di halaman tersebut.

<img :src="$withBase('/images/plan-activities/bulk_button.png')" alt="plan activities checked button" height="350" style="object-fit: contain;" />

Setelah memilih data yang ingin diupdate, Anda dapat mengklik button `Update Status` dan akan muncul modal untuk melakukan update status secara massal.

---

<img :src="$withBase('/images/plan-activities/bulk_update_status.png')" alt="plan activities update status massal" height="400" style="object-fit: contain;" />

Pada modal tersebut akan muncul preview data yang akan dihapus. Anda dapat mengubah data-data site yang telah Anda pilih sebelumnya melalui form input yang terdapat pada modal tersebut. Setelah itu, Anda dapat memilih status <strong style="color:rgb(22, 163, 74);">Done</strong>, atau <strong style="color:#FF7723;">Not Yet</strong> pada masing-masing aktivitas yang telah Anda pilih. Apabila Anda mengklik status <strong style="color:rgb(22, 163, 74);">Done</strong>, maka Anda harus mengisi tanggal dieksekusinya status tersebut.

Jika semua status yang Anda pilih sudah sesuai, Anda dapat mengklik button `Update` dan mengonfirmasi bahwa akan melakukan update status secara massal. Apabila Anda ingin membatalkan update status, Anda dapat mengklik button `Cancel`. Setelah melakukan update status, maka akan muncul notifikasi sukses dan secara otomatis data pada tabel akan berubah sesuai dengan data yang telah Anda update.

<img :src="$withBase('/images/plan-activities/bulk_update_status_success.png')" alt="plan activities update status massal success" height="300" style="object-fit: contain;" />

### 4. Mengedit data `plan activity`

<img :src="$withBase('/images/plan-activities/table_action_user.jpeg')" alt="table action" height="300" style="object-fit: contain;" />

Anda dapat mengedit data `plan activity` dengan mengklik Ikon <img :src="$withBase('/icons/pencil.jpg')" alt="icon edit" height="20" style="object-fit: contain;" /> yang terdapat di kolom Action paling kanan tabel. Setelah itu, Anda akan diarahkan ke form `update plan activity`.

<img :src="$withBase('/images/plan-activities/update_plan_user.jpeg')" alt="plan activity update plan" height="500" style="object-fit: contain;" />

**Perlu diingat, bahwa data activity dan siteID tidak dapat diubah karena sudah diatur oleh Admin**. Akan tetapi, apabila data lainnya ada kesalahan Anda dapat mengubah data PIC, Additional Info, Remark, dan Target Quartal.

Apabila data yang Anda ubah sudah sesuai, Anda dapat mengklik button `Update Data` dan akan muncul notifikasi sukses apabila data berhasil diubah.
