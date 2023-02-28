# Manual Guide Admin

[[toc]]

## I. Getting Started

### Prerequisites

Dalam mengoperasikan website ini, diperlukan pengetahuan dasar mengenai XAMPP, PHP, dan MySQL.

### Cara Membuat Database

Secara default, website ini sudah terintegrasi dengan database MySQL. Akan tetapi, ada kalanya kita ingin membuat database baru. Berikut adalah
langkah-langkahnya:

1. Buka XAMPP Control Panel
2. Klik tombol Start pada bagian Apache dan MySQL
3. Buka browser dan ketikkan `localhost/phpmyadmin`
4. Pada bagian kiri, klik tombol New

<img :src="$withBase('/images/admin/create_database_new.png')" alt="new database" height="200" style="object-fit: contain;" />

5. Isi nama database dan klik tombol Create. Contoh nama database yang akan dibuat adalah `tsel_radio_test`

<img :src="$withBase('/images/admin/create_database_entry.png')" alt="entry database" height="200" style="object-fit: contain;" />

6. Pada bagian kiri, klik nama database yang baru saja dibuat

<img :src="$withBase('/images/admin/create_database_created.png')" alt="created database" height="200" style="object-fit: contain;" />

7. Pada bagian kanan, klik tombol Import

<img :src="$withBase('/images/admin/database_import.png')" alt="import database" height="200" style="object-fit: contain;" />

8. Pilih file database yang akan diimport, Anda dapat mengunduh struktur database pada link berikut: [tsel_radio.sql](/documents/tsel_radio.sql)

<img :src="$withBase('/images/admin/database_import_entry.png')" alt="entry import database" height="200" style="object-fit: contain;" />

9.  Biarkan pengaturan lainnya diset secara default, kemudian scroll ke bawah dan klik button `Go`

<img :src="$withBase('/images/admin/database_import_go.png')" alt="go import database" height="200" style="object-fit: contain;" />

10. Setelah selesai, database berhasil dibuat. Anda dapat mengecek tabel-tabel yang ada pada database tersebut dengan cara klik nama database yang baru saja dibuat

### Atur Password Admin

Di awal, password untuk akun admin sudah diatur secara default. Jika Anda ingin mengubahnya, Anda dapat mengikuti langkah-langkah berikut:

1. Kunjungi [Generate Password Hash](https://phppasswordhash.com/)
2. Ketikkan password yang Anda inginkan pada kolom Password berikut :

   **Pastikan password terdiri minimal 8 karakter, dengan setidaknya terdapat satu huruf besar, satu huruf kecil, dan satu angka.**

    <img :src="$withBase('/images/admin/password_hash_entry.png')" alt="entry password" height="200" style="object-fit: contain;" />

3. Secara otomatis, hasil hash akan muncul pada kolom Hash. Lalu copy hasil hash tersebut.

   <img :src="$withBase('/images/admin/password_hash_result.png')" alt="result password" height="200" style="object-fit: contain;" />

4. Selanjutnya, buka kembali `localhost/phpmyadmin`
5. Pada bagian kiri, klik nama database yang tadinya sudah dibuat. Kemudian, klik tabel `user`

   <img :src="$withBase('/images/admin/table_user_hover.png')" alt="table user" height="200" style="object-fit: contain;" />

6. Pada tabel tersebut, klik tombol Edit pada baris yang memiliki kolom `username` bernilai `admin`

   <img :src="$withBase('/images/admin/table_user_edit_button.png')" alt="table user edit button" height="200" style="object-fit: contain;" />

7. Pada kolom `password`, ubahlah nilai yang ada dengan hasil hash yang sudah Anda copy sebelumnya

   <img :src="$withBase('/images/admin/table_user_edit.png')" alt="table user edit" height="200" style="object-fit: contain;" />

8. Anda juga dapat mengubah kolom `username` sesuai keinginan Anda
9. Jika sudah sesuai, klik tombol `Go`
10. Setelah itu pengaturan akun admin berhasil diubah, Anda dapat mengakses website dengan menggunakan kredensial yang baru.

### Melakukan Import Data Activity, Program, dan Subprogram

Dalam website ini, data activity, program, dan subprogram yang digunakan adalah data yang sudah diimport dari database yang ada di server. Oleh karena itu, user tidak dapat menambahkan data-data tersebut secara manual. Sebagai admin, Anda dapat melakukan import data tersebut melalui database dengan mengikuti langkah-langkah berikut:

1. Buka website `phpmyadmin`
2. Pada bagian kiri, klik nama database yang tadinya sudah dibuat.
3. Silahkan pilih salah satu tabel antara `activity`, `program`, atau `subprogram`. Sebagai contoh, kita akan melakukan import data pada tabel `activity`

   <img :src="$withBase('/images/admin/database_import_table.png')" alt="table import" height="300" style="object-fit: contain;" />

4. Pada bagian kanan, klik menu Import

   <img :src="$withBase('/images/admin/database_import.png')" alt="import database" height="200" style="object-fit: contain;" />

5. Pilih file csv yang akan diimport, Anda dapat mengunduh template csv pada link berikut:

   - [activity.csv](/documents/activity.csv)
   - [program.csv](/documents/program.csv)
   - [subprogram.csv](documents/subprogram.csv)

   <img :src="$withBase('/images/admin/database_import_entry.png')" alt="entry import database" height="200" style="object-fit: contain;" />

6. Pada bagian `Format`, pilih `CSV`

   <img :src="$withBase('/images/admin/database_import_csv.png')" alt="csv import database" height="200" style="object-fit: contain;" />

7. Biarkan pengaturan lainnya diset secara default, kemudian scroll ke bawah dan klik tombol Go
8. Setelah selesai, data activity berhasil diimport. Anda dapat melihat data tersebut melalui tabel activity pada database

### Menginput Data Secara Manual

Selain itu, Anda juga dapat melakukan input data activity secara manual melalui database. **Akan tetapi, untuk menginput data activity perlu dipastikan bahwa sebelumnya data pada tabel program dan subprogram telah terisi**. Hal ini disebabkan dalam menginput data activity secara manual, diperlukan data-data program dan subprogram yang sudah ada di database.

Anda dapat melakukan input data activity, program, dan subprogram secara manual dengan langkah-langkah di bawah ini. Sebagai contoh, kita akan melakukan input data activity secara manual.

1. Buka website `phpmyadmin`
2. Pada bagian kiri, klik nama database yang tadinya sudah dibuat. Kemudian, klik tabel `activity`

   <img :src="$withBase('/images/admin/table_activity_hover.png')" alt="table activity" height="300" style="object-fit: contain;" />

3.Klik menu Insert

   <img :src="$withBase('/images/admin/database_insert.png')" alt="table insert" height="200" style="object-fit: contain;" />

4. Pada halaman tersebut akan muncul kolom-kolom yang dapat diisi. Isi kolom-kolom tersebut sesuai dengan data activity yang akan diinputkan

   <img :src="$withBase('/images/admin/table_activity_insert.png')" alt="table insert entry" height="350" style="object-fit: contain;" />

   **_Perlu dicatat bahwa kolom `id` tidak perlu diisi, karena akan diisi secara otomatis oleh sistem_**

   **Keterangan**

   - 1. **Isi** deskripsi aktivitas pada kolom `description_activity`
   - 2. **Isi** pemilik budget pada kolom `budget`
   - 3. **Isi** cost yang dibutuhkan pada kolom `cost`
   - 4. **Pilih** program yang akan mengerjakan aktivitas pada kolom `program`
   - 5. **Pilih** sub program yang akan mengerjakan aktivitas pada kolom `sub_program`
   - 6. Anda dapat mengatur jumlah baris yang akan diinputkan dengan mengubah nilai pada kolom `Continue insertion with ... rows`.
   - 7. Jika semua kolom sudah diisi dengan sesuai, Anda dapat mengklik button `Go`

5. Setelah diproses data activity akan berhasil diinputkan

### Next Step

Setelah melakukan konfigurasi database, Anda sudah dapat mengakses website dengan menggunakan akun admin. Untuk mengetahui cara mengakses website, Anda dapat memulai dengan mengikuti [Halaman Login](#halaman-login)

## II. Halaman Login

<img :src="$withBase('/images/page_login.jpeg')" alt="login" height="400" style="object-fit: contain;" />

### Masuk sebagai Admin

Untuk mengakses website, Anda wajib melakukan login terlebih dahulu. Anda dapat menggunakan akun admin yang telah dibuat sebelumnya, dengan cukup mengisi kolom `username` dan `password` sebagai kredensial. Jika kredensial yang Anda masukkan benar, Anda akan diarahkan ke halaman dashboard.

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
   <img :src="$withBase('/images/project-planner/table2.jpeg')" alt="project planner table" height="300" style="object-fit: contain;" />

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

- Menginput `activity` baru
- Mengimport `plan activities` dari file excel
- Mengexport `plan activities` ke file excel
- Filter & Sorting tabel per kolom
- Update status dari `plan activity` baik satu per satu maupun secara massal
- Menghapus `plan activity` baik satu per satu maupun secara massal
- Mengedit data `plan activity`

Untuk lebih lanjut, mari simak penjelasan berikut ini:

### 1. Menginput `activity` baru

Pertama Anda dapat mengklik button `Input` yang terdapat di bagian sebelah kanan atas tabel. Kemudian akan muncul form seperti berikut ini:

<img :src="$withBase('/images/plan-activities/input.jpeg')" alt="plan activities input" height="400" style="object-fit: contain;" />

Dari form tersebut, Anda dapat menginput data-data yang dibutuhkan untuk membuat `plan activity` baru.

- **Activity**. Anda dapat memilih `activity` yang sudah ada di database

::: warning Ingat!
Ingat, Anda hanya dapat memilih `activity` yang sudah ada di database. Apabila `activity` yang Anda inginkan belum ada di database, Anda dapat menginput data `activity` terlebih dahulu melalui database dengan mengikuti panduan berikut ini: [Melakukan Import Data Activity](#melakukan-import-data-activity)
:::

- **Site**. Anda dapat memilih `site` yang sudah ada di database.

::: tip
Jika site yang dibutuhkan belum tersedia, Anda dapat menambahkannya terlebih dahulu melalui halaman [Sites](#vi-halaman-sites)
:::

- **Remark**. Anda dapat menginput `remark` yang dibutuhkan untuk `plan activity` tersebut
- **Target Quarter**. Anda dapat memilih `target quarter` yang dibutuhkan untuk `plan activity` tersebut
- **Status**. Anda dapat memilih `status` <strong style="color:rgb(22, 163, 74);">Done</strong>, atau <strong style="color:#FF7723;">Not Yet</strong>
- **Date Executed** (optional). Jika Anda memilih `status` <strong style="color:rgb(22, 163, 74);">Done</strong>, maka Anda wajib untuk menginput tanggal aktivitas tersebut selesai dilakukan

Setelah menginput data-data yang dibutuhkan, Anda dapat mengklik button `Input Data` untuk menyimpan data-data tersebut. Apabila data yang Anda input sudah benar, maka akan muncul notifikasi seperti berikut ini:

<img :src="$withBase('/images/plan-activities/input_success.png')" alt="plan activities input success" height="200" style="object-fit: contain;" />

### 2. Mengimport `plan activities` dari file excel

Anda dapat mengimport `plan activities` dari file excel dengan mengklik button `Import` yang terdapat di bagian sebelah kanan atas tabel. Kemudian akan muncul form seperti berikut ini:

<img :src="$withBase('/images/plan-activities/import.jpeg')" alt="plan activities import" height="400" style="object-fit: contain;" />

- Pertama, Anda harus mendownload template yang telah disediakan untuk mengimport `plan activities` dengan mengklik button `Download Template`
- Setelah file excel sudah sesuai dengan template, Anda dapat memasukkan file tersebut dengan mengklik button `Choose File` atau dengan _drag and drop file_ excel tersebut ke dalam form
- Setelah itu, Anda dapat mengklik button `Import Data` untuk mengimport data-data yang ada di file excel tersebut

Setelah proses import selesai, maka akan terjadi beberapa kondisi berikut ini:

#### a. Apabila semua data berhasil diimport, maka akan muncul alert seperti berikut ini:

<img :src="$withBase('/images/plan-activities/import_success.png')" alt="plan activities import success" height="200" style="object-fit: contain;" />

#### b. Apabila terdapat data yang tidak sesuai dengan format atau kesalahan lainnya, maka data tersebut tidak akan dimasukkan ke dalam database. Anda perlu menyesuaikan data tersebut melalui pesan error yang ditampilkan pada alert seperti berikut:

<img :src="$withBase('/images/plan-activities/import_warning.png')" alt="plan activities import warning" height="200" style="object-fit: contain;" />

#### c. Apabila terdapat data yang sudah ada pada database, tetapi memiliki data yang berbeda dengan data yang ada di database, maka data tersebut perlu Anda konfirmasi terlebih dahulu apakah akan diupdate atau tidak:

<img :src="$withBase('/images/plan-activities/import_confirm.png')" alt="plan activities import confirm" height="300" style="object-fit: contain;" />

Pada halaman ini, Anda dapat melihat data-data yang akan diimport. Beberapa hal yang dapat dilakukan adalah sebagai berikut:

- Apabila Anda ingin memilih apakah data tersebut akan diupdate atau tidak, Anda dapat mengklik checkbox yang terdapat di sebelah kiri data tersebut
- Apabila Anda ingin memilih semua data, Anda dapat mengklik button `Select All` atau `Reset` untuk membatalkan pilihan
- Apabila Anda ingin memfilter data berdasarkan aktivitas atau site, Anda dapat mengetikkan nama aktivitas atau site yang ingin Anda cari pada input text yang terdapat di bagian kiri atas tabel.

  **Note**: _Apabila data tabel merupakan hasil dari filter, maka ketika Anda mengklik button `Select All` atau `Reset`, aktivitas yang terpilih hanya data yang tampil pada filter tersebut._

- Untuk mengetahui perbedaan data yang ada di database dan data yang akan diimport, Anda dapat mengarahkan kursor ke kolom yang berwarna <strong style="color:rgb(22, 163, 74);">hijau</strong>, maka akan muncul tooltip dari data sebelumnya seperti berikut ini:

   <img :src="$withBase('/images/plan-activities/import_tooltip.png')" alt="plan activities import confirm tooltip" height="150" style="object-fit: contain;" />

- Apabila Anda ingin membatalkan keseluruhan data, maka Anda dapat mengklik button `Cancel` dan mengonfirmasi pembatalan update.
  <img :src="$withBase('/images/plan-activities/import_cancel.png')" alt="plan activities import confirm cancel" height="150" style="object-fit: contain;" />

- Apabila Anda sudah yakin dengan pilihan data yang akan diupdate, Anda dapat mengklik button `Update` dan mengonfirmasi bahwa akan mengupdate.
  <img :src="$withBase('/images/plan-activities/import_update.png')" alt="plan activities import confirm update" height="150" style="object-fit: contain;" />

Apabila update berhasil dieksekusi, maka akan muncul notifikasi seperti berikut:

   <img :src="$withBase('/images/plan-activities/import_update_success.png')" alt="plan activities import update success" height="100" style="object-fit: contain;" />

### 3. Mengexport `plan activities` ke file excel

Jika Anda ingin mengexport, Anda cukup mengklik button `Export` yang terdapat di bagian sebelah kanan atas tabel. Ketika berhasil melakukan proses export, maka file hasil export akan otomatis terdownload dan muncul notifikasi sukses

### 4. Sorting & Filter tabel per kolom

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

### 5. Update status dari `plan activity` satu per satu

<img :src="$withBase('/images/plan-activities/update_status.png')" alt="plan activities update status" height="300" style="object-fit: contain;" />

Anda dapat melakukan update status dari `plan activity` dengan mengklik tag status sesuai baris yang ingin Anda update. Setelah itu, Anda dapat memilih status <strong style="color:rgb(22, 163, 74);">Done</strong>, atau <strong style="color:#FF7723;">Not Yet</strong> yang terdapat pada dropdown menu yang muncul. Apabila Anda mengklik status <strong style="color:rgb(22, 163, 74);">Done</strong>, maka Anda harus mengisi tanggal dieksekusinya status tersebut.

### 6. Update status dari `plan activity` secara massal

Sebelum ingin melakukan update status secara massal, Anda harus memilih data yang ingin Anda update statusnya dengan mengklik checkbox yang terdapat di sebelah kiri data tersebut. Selain mengklik satu per satu, Anda juga dapat mengklik button `Select All` untuk memilih semua data yang ada pada tabel di halaman tersebut atau mengklik button `Reset Checkbox` untuk membatalkan pilihan data yang telah Anda buat pada tabel di halaman tersebut.

<img :src="$withBase('/images/plan-activities/bulk_button.png')" alt="plan activities checked button" height="350" style="object-fit: contain;" />

Setelah memilih data yang ingin diupdate, Anda dapat mengklik button `Update Status` dan akan muncul modal untuk melakukan update status secara massal.

---

<img :src="$withBase('/images/plan-activities/bulk_update_status.png')" alt="plan activities update status massal" height="400" style="object-fit: contain;" />

Pada modal tersebut akan muncul preview data yang akan diupdate. Anda dapat mengubah data-data site yang telah Anda pilih sebelumnya melalui form input yang terdapat pada modal tersebut. Setelah itu, Anda dapat memilih status <strong style="color:rgb(22, 163, 74);">Done</strong>, atau <strong style="color:#FF7723;">Not Yet</strong> pada masing-masing aktivitas yang telah Anda pilih. Apabila Anda mengklik status <strong style="color:rgb(22, 163, 74);">Done</strong>, maka Anda harus mengisi tanggal dieksekusinya status tersebut.

Jika semua status yang Anda pilih sudah sesuai, Anda dapat mengklik button `Update` dan mengonfirmasi bahwa akan melakukan update status secara massal. Apabila Anda ingin membatalkan update status, Anda dapat mengklik button `Cancel`. Setelah melakukan update status, maka akan muncul notifikasi sukses dan secara otomatis data pada tabel akan berubah sesuai dengan data yang telah Anda update.

<img :src="$withBase('/images/plan-activities/bulk_update_status_success.png')" alt="plan activities update status massal success" height="300" style="object-fit: contain;" />

### 7. Menghapus `plan activity` satu per satu

<img :src="$withBase('/images/plan-activities/table_action.png')" alt="table action" height="300" style="object-fit: contain;" />

Anda dapat menghapus `plan activity` dengan mengklik Ikon <img :src="$withBase('/icons/trash.png')" alt="icon delete" height="20" style="object-fit: contain;" /> yang terdapat di kolom Action paling kanan tabel. Setelah itu, Anda akan diminta untuk mengonfirmasi bahwa Anda ingin menghapus data tersebut. Apabila Anda ingin menghapus data tersebut, Anda dapat mengklik button `Confirm` dan akan muncul notifikasi sukses apabila `plan activity` berhasil dihapus.

<img :src="$withBase('/images/plan-activities/delete.png')" alt="plan activity delete" height="300" style="object-fit: contain;" />
<img :src="$withBase('/images/plan-activities/delete_success.png')" alt="plan activitiy delete success" height="300" style="object-fit: contain;" />

### 8. Menghapus `plan activity` secara massal

Sebelum ingin melakukan penghapusan secara massal, Anda harus memilih data yang ingin Anda hapus dengan mengklik checkbox yang terdapat di sebelah kiri data tersebut. Selain mengklik satu per satu, Anda juga dapat mengklik button `Select All` untuk memilih semua data yang ada pada tabel di halaman tersebut atau mengklik button `Reset Checkbox` untuk membatalkan pilihan data yang telah Anda buat pada tabel di halaman tersebut.

<img :src="$withBase('/images/plan-activities/bulk_button.png')" alt="plan activities checked button" height="350" style="object-fit: contain;" />

Setelah memilih data yang ingin dihapus, Anda dapat mengklik button `Delete` dan akan muncul modal untuk melakukan penghapusan secara massal.

---

<img :src="$withBase('/images/plan-activities/bulk_delete.png')" alt="plan activities delete massal" height="400" style="object-fit: contain;" />

Pada modal tersebut akan muncul preview data yang akan dihapus. Anda dapat mengubah data-data site yang telah Anda pilih sebelumnya melalui form input yang terdapat pada modal tersebut. Apabila Anda ingin menghapus data tersebut, Anda dapat mengklik button `Delete` dan mengonfirmasi bahwa akan melakukan penghapusan secara massal. Apabila Anda ingin membatalkan penghapusan, Anda dapat mengklik button `Cancel`. Setelah melakukan penghapusan, maka akan muncul notifikasi sukses apabila `plan activity` berhasil dihapus.

<img :src="$withBase('/images/plan-activities/bulk_delete_success.png')" alt="plan activities delete massal success" height="300" style="object-fit: contain;" />

### 9. Mengedit data `plan activity`

<img :src="$withBase('/images/plan-activities/table_action.png')" alt="table action" height="300" style="object-fit: contain;" />

Anda dapat mengedit data `plan activity` dengan mengklik Ikon <img :src="$withBase('/icons/pencil.jpg')" alt="icon edit" height="20" style="object-fit: contain;" /> yang terdapat di kolom Action paling kanan tabel. Setelah itu, Anda akan diarahkan ke form `update plan activity`.

<img :src="$withBase('/images/plan-activities/update_plan.jpeg')" alt="plan activity update plan" height="500" style="object-fit: contain;" />

**Perlu diketahui, data activity dan siteID tidak dapat diubah**. Akan tetapi, Anda dapat mengubah data lainnya seperti PIC, Additional Info, Remark, Budget, Cost, dan Target Quartal.

Apabila data yang Anda ubah sudah sesuai, Anda dapat mengklik button `Update Data` dan akan muncul notifikasi sukses apabila data berhasil diubah.

::: tip
Untuk mengubah data plan activity secara massal, Anda dapat memanfaatkan langkah-langkah pada bagian [Mengimport plan activities dari file excel](#_2-mengimport-plan-activities-dari-file-excel) dan bisa melihat kondisi pada point c.
:::

## VI. Halaman Sites

<img :src="$withBase('/images/sites/page.jpeg')" alt="sites" height="400" style="object-fit: contain;" />

Pada halaman ini, Anda dapat melihat data-data site pada departemen RTPO berdasarkan data yang telah Anda masukkan. Selain itu, Anda juga dapat beberapa hal sebagai berikut:

- Menginput `site` baru
- Mengimport `sites` dari file excel
- Mengexport `sites` ke file excel
- Filter data `sites` berdasarkan siteID atau site name
- Sorting tabel per kolom
- Mengedit data `site`
- Menghapus data `site`

Untuk lebih lanjut, simak penjelesan berikut ini.

### 1. Menginput `site` baru

Anda dapat menginput `site` baru dengan mengklik button `Input` pada bagian atas kanan tabel. Setelah itu, Anda akan diarahkan ke form `input site`.

<img :src="$withBase('/images/sites/input.jpeg')" alt="sites input" height="500" style="object-fit: contain;" />

Pada form tersebut, Anda dapat menginput data-data sebagai berikut:

- **Site ID** : ID dari site yang akan Anda input
- **Site Name** : Nama dari site yang akan Anda input
- **NS Department** : Pilih NS Department dari database untuk site yang akan Anda input
- **DO Sub Department** : Pilih DO Sub Department dari database untuk site yang akan Anda input
- **Kabupaten** : Pilih Kabupaten dari database untuk lokasi site yang akan Anda input berada

Apabila data yang Anda input sudah sesuai, Anda dapat mengklik button `Input Data` dan akan muncul notifikasi sukses apabila `site` berhasil ditambahkan.

<img :src="$withBase('/images/sites/input_success.png')" alt="sites input success" height="100" style="object-fit: contain;" />

### 2. Mengimport sites dari file excel

Anda dapat mengimport sites dari file excel dengan mengklik button `Import` pada bagian atas kanan tabel. Setelah itu, Anda akan diarahkan ke form `import sites`.

<img :src="$withBase('/images/sites/import.jpeg')" alt="sites import" height="500" style="object-fit: contain;" />

- Pertama, Anda harus mendownload template yang telah disediakan untuk mengimport `sites` dengan mengklik button `Download Template`
- Setelah file excel sudah sesuai dengan template, Anda dapat memasukkan file tersebut dengan mengklik button `Choose File` atau dengan _drag and drop file_ excel tersebut ke dalam form
- Setelah itu, Anda dapat mengklik button `Import Data` untuk mengimport data-data yang ada di file excel tersebut

Setelah proses import selesai, maka akan terjadi beberapa kondisi berikut ini:

#### a. Apabila semua data berhasil diimport, maka akan muncul alert seperti berikut ini:

<img :src="$withBase('/images/sites/import_success.jpeg')" alt="sites import success" height="200" style="object-fit: contain;" />

#### b. Apabila terdapat data yang tidak sesuai dengan format atau kesalahan lainnya, maka data tersebut tidak akan dimasukkan ke dalam database. Anda perlu menyesuaikan data tersebut melalui pesan error yang ditampilkan pada alert seperti berikut:

<img :src="$withBase('/images/sites/import_warning.jpeg')" alt="sites import warning" height="200" style="object-fit: contain;" />

#### c. Apabila terdapat data yang sudah ada pada database, tetapi memiliki data yang berbeda dengan data yang ada di database, maka data tersebut perlu Anda konfirmasi terlebih dahulu apakah akan diupdate atau tidak:

<img :src="$withBase('/images/sites/bulk_update.jpeg')" alt="sites import bulk update" height="300" style="object-fit: contain;" />

Pada halaman ini, Anda dapat melihat data-data yang akan diimport. Beberapa hal yang dapat dilakukan adalah sebagai berikut:

- Apabila Anda ingin memilih apakah data tersebut akan diupdate atau tidak dengan mengklik checkbox yang terdapat di sebelah kiri data tersebut
- Apabila Anda ingin memilih semua data, Anda dapat mengklik button `Select All` atau `Reset` untuk membatalkan pilihan
- Apabila Anda ingin memfilter data berdasarkan aktivitas atau site, Anda dapat mengetikkan nama aktivitas atau site yang ingin Anda cari pada input text yang terdapat di bagian kiri atas tabel.

  **Note**: _Apabila data tabel merupakan hasil dari filter, maka ketika Anda mengklik button `Select All` atau `Reset`, aktivitas yang terpilih hanya data yang tampil pada filter tersebut._

- Untuk mengetahui perbedaan data yang ada di database dan data yang akan diimport, Anda dapat mengarahkan kursor ke kolom yang berwarna <strong style="color:rgb(22, 163, 74);">hijau</strong>, maka akan muncul tooltip dari data sebelumnya seperti berikut ini:

   <img :src="$withBase('/images/sites/bulk_update_hover.png')" alt="sites import bulk update hover" height="300" style="object-fit: contain;" />

- Apabila Anda ingin membatalkan keseluruhan data, maka Anda dapat mengklik button `Cancel` dan mengonfirmasi pembatalan update.

   <img :src="$withBase('/images/plan-activities/import_cancel.png')" alt="sites import confirm cancel" height="150" style="object-fit: contain;" />

- Apabila Anda sudah yakin dengan pilihan data yang akan diupdate, Anda dapat mengklik button `Update` dan mengonfirmasi bahwa akan mengupdate.

   <img :src="$withBase('/images/sites/bulk_update_confirm.jpeg')" alt="sites import confirm update" height="150" style="object-fit: contain;" />

Apabila update berhasil dieksekusi, maka akan muncul notifikasi seperti berikut:

   <img :src="$withBase('/images/sites/bulk_update_success.png')" alt="sites import update success" height="200" style="object-fit: contain;" />

### 3. Mengexport sites ke file excel

Jika Anda ingin mengexport, Anda cukup mengklik button `Export` yang terdapat di bagian sebelah kanan atas tabel. Ketika berhasil melakukan proses export, maka file hasil export akan otomatis terdownload dan muncul notifikasi sukses

### 4. Sorting & Filter tabel

#### 1. Sorting tabel per kolom

<img :src="$withBase('/images/sites/sorting.jpeg')" alt="sites sorting" height="300" style="object-fit: contain;" />

Selain itu, Anda juga dapat melakukan sorting tabel per kolom. Anda dapat mensortir data dengan mengklik ikon <span style="font-size:10px">&#9650;</span> urut secara ascending (A-Z) atau ikon <span style="font-size:10px;">&#9660;</span> urut secara descending (Z-A) yang berada di sebelah kanan header kolom

::: warning Ingat!
Pengimplementasian sorting hanya bisa dilakukan untuk satu kolom. Jika anda mengklik kolom yang berbeda, otomatis kolom yang telah disorting sebelumnya akan hilang dan berpindah menjadi implementasi sorting untuk kolom yang dipilih.
:::

#### 2. Filter

<img :src="$withBase('/images/sites/filter.png')" alt="sites filter" height="300" style="object-fit: contain;" />

Anda dapat memfilter data berdasarkan site id atau site name, dengan cara mengetikkannya pada input text yang terdapat di bagian kiri atas tabel. Nantinya, data yang ditampilkan adalah data yang sesuai dengan filter yang Anda masukkan. Anda dapat menghapus filter dengan mengklik button `X` yang terdapat di sebelah kanan input text.

### 6. Mengedit data site

<img :src="$withBase('/images/sites/edit.jpeg')" alt="sites form edit" height="300" style="object-fit: contain;" />

Anda dapat mengedit data `site` dengan mengklik Ikon <img :src="$withBase('/icons/pencil.jpg')" alt="icon edit" height="20" style="object-fit: contain;" /> yang terdapat di kolom Action paling kanan tabel. Setelah itu, Anda akan diarahkan ke form `update site`.

<img :src="$withBase('/images/sites/edit_warning.png')" alt="sites edit success" height="200" style="object-fit: contain;" />

Apabila data `site` yang anda pilih memiliki `plan activity` yang sudah diinputkan, maka pada bagian atas form akan muncul alert yang menginformasikan berapa banyak `plan activity` yang terkait dengan `site` tersebut. Anda dapat melihat data `plan activity` tersebut dengan mengklik button `Review`.

Apabila Anda yakin ingin mengubah data `site`, Anda dapat mengubah data pada form `update site`. Jika sudah sesuai, Anda dapat mengklik button `Update Data` untuk menyimpan perubahan data dan mengonfirmasi perubahan data tersebut. Apabila berhasil, maka akan muncul notifikasi seperti berikut:

<img :src="$withBase('/images/sites/edit_success.png')" alt="sites edit success" height="200" style="object-fit: contain;" />

::: tip
Untuk mengubah data site secara massal, Anda dapat memanfaatkan langkah-langkah pada bagian [Mengimport sites dari file excel](#_2-mengimport-sites-dari-file-excel) dan bisa melihat kondisi pada point c.
:::

### 7. Menghapus data site

<img :src="$withBase('/images/sites/delete.jpeg')" alt="icon delete" height="300" style="object-fit: contain;" />

Anda dapat menghapus `site` dengan mengklik Ikon <img :src="$withBase('/icons/trash.png')" alt="site delete" height="20" style="object-fit: contain;" /> yang terdapat di kolom Action paling kanan tabel. Setelah itu, Akan muncul modal yang berisikan informasi mengenai berapa banyak `plan activities` yang terlibat dengan `site` yang akan dihapus. Jika Anda yakin ingin menghapus `site` tersebut, maka Anda dapat mengklik button `Confirm` dan data `site` akan terhapus. Apabila berhasil, maka akan muncul notifikasi seperti berikut:

<img :src="$withBase('/images/sites/delete_success.png')" alt="sites delete success" height="200" style="object-fit: contain;" />

## VII. Halaman Accounts

<img :src="$withBase('/images/accounts/page.jpeg')" alt="accounts" height="400" style="object-fit: contain;" />

Pada halaman ini, Anda dapat mengelola data `accounts` yang terdaftar pada sistem. Anda dapat melakukan beberapa hal pada halaman ini, yaitu:

- Menambahkan akun baru
- Mengedit data akun
- Menonaktifkan atau mengaktifkan akun
- Mereset password akun

### 1. Menambahkan akun baru

Anda dapat menambahkan akun baru dengan mengklik button `Add Account` yang terdapat di bagian sebelah kanan atas tabel. Setelah itu, Anda akan diarahkan ke form `add new account`.

<img :src="$withBase('/images/accounts/input.jpeg')" alt="accounts input" height="500" style="object-fit: contain;" />

Pada form tersebut, Anda dapat menginput data-data sebagai berikut:

- **Username** : username akun yang akan dibuat. Pastikan username terdiri minimal dari 5 karakter dan belum pernah digunakan oleh akun lain. Penggunaan simbol pada usename hanya diperbolehkan menggunakan simbol `_` dan `-`.
  - Contoh username yang valid: `user_1`, `user-1`, `user1`, `userguest`
- **Password** : password untuk akun yang akan dibuat. Pastikan password harus terdiri minimal dari 8 karakter dan minimal memiliki 1 huruf besar, 1 huruf kecil, dan 1 angka.
  - Contoh password yang valid: `Password1`, `Password@1`
- **Confirm Password** : Pastikan password yang Anda inputkan sama dengan password yang Anda inputkan pada kolom `Password`.
- **NS Department** : departemen yang terkait dengan akun yang akan dibuat. Anda dapat memilih salah satu dari departemen yang terdaftar pada sistem.
- **Status** : secara default, status akun yang akan dibuat adalah `Active`. Anda dapat mengubah status menjadi `Deactive` apabila akun tersebut tidak akan digunakan lagi.

Apabila data yang Anda input sudah sesuai, Anda dapat mengklik button `Add New Account` dan akan muncul notifikasi sukses apabila `account` berhasil ditambahkan.

<img :src="$withBase('/images/accounts/input_success.png')" alt="accounts input success" height="200" style="object-fit: contain;" />

### 2. Mengedit data akun

Anda dapat mengedit data akun dengan mengklik Ikon <img :src="$withBase('/icons/pencil.jpg')" alt="icon edit" height="20" style="object-fit: contain;" /> yang terdapat di kolom Action paling kanan tabel. Setelah itu, akan muncul modal yang berisikan data-data akun yang akan diubah.

<img :src="$withBase('/images/accounts/edit.png')" alt="accounts edit" height="500" style="object-fit: contain;" />

Anda dapat mengubah data `username` dan `NS Department`. Apabila data yang Anda ubah sudah sesuai, Anda dapat mengklik button `Update` untuk menyimpan perubahan data dan mengonfirmasi perubahan data tersebut. Apabila berhasil, maka akan muncul notifikasi seperti berikut:

<img :src="$withBase('/images/accounts/edit_success.png')" alt="accounts edit success" height="200" style="object-fit: contain;" />

### 3. Menonaktifkan atau mengaktifkan akun

Apabila Anda ingin mengubah status akun menjadi `Deactive`, atau sebaliknya, Anda dapat mengklik tag `Active` atau `Deactive` yang terdapat di kolom `Status` pada tabel. Setelah itu, akan muncul dropdown yang berisikan pilihan `Active` dan `Deactive`.

<img :src="$withBase('/images/accounts/update_status.jpeg')" alt="accounts update" height="180" style="object-fit: contain;" />

Anda dapat memilih salah satu dari pilihan tersebut. Apabila berhasil, maka akan muncul notifikasi seperti berikut:

<img :src="$withBase('/images/accounts/update_status_success.png')" alt="accounts update success" height="200" style="object-fit: contain;" />

### 4. Mereset akun

<img :src="$withBase('/images/accounts/reset.png')" alt="accounts reset" height="150" style="object-fit: contain;" />

Ada kalanya, User akan lupa dengan password akun yang telah mereka buat. Untuk mengatasi hal tersebut, Anda dapat mereset akun sehingga user dapat melakukan reset ulang akun mereka. Anda dapat dengan mengklik Ikon <img :src="$withBase('/icons/key.png')" alt="icon reset" height="20" style="object-fit: contain;" /> yang terdapat di kolom `Reset Account` tabel. Setelah itu, akan muncul modal untuk mengonfirmasi reset account.

<img :src="$withBase('/images/accounts/reset_confirmation.png')" alt="accounts reset confirmation" height="400" style="object-fit: contain;" />

Apabila berhasil, maka akan muncul notifikasi seperti berikut:

<img :src="$withBase('/images/accounts/reset_success.png')" alt="accounts reset password success" height="200" style="object-fit: contain;" />
