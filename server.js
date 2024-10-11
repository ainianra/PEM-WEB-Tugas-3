const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
    let q = url.parse(req.url, true);
    let namafile = "." + (q.pathname === "/" ? "/1index.html" : q.pathname);

    fs.readFile(namafile, function (err, data) {
        if (err) {
            res.statusCode = 404; // Halaman tidak ditemukan
            res.setHeader('Content-Type', 'text/html');
            return res.end("<h1>404 Halaman Tidak Ditemukan</h1>");
        }

        // Mengatur header berdasarkan tipe file
        if (namafile.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        } else {
            res.setHeader('Content-Type', 'text/html');
        }

        res.statusCode = 200; // Halaman berfungsi dengan baik
        res.write(data);
        return res.end(); // Pastikan untuk memanggil fungsi ini
    });
});

server.listen(3000, () => {
    console.log('Server berhasil berjalan di port 3000');
});
