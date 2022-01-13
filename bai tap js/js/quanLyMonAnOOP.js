var mangMonAn = [];
var checkError = new Validation();

//Viết chức năng cho nút thêm món
document.querySelector('#btnThemMon').onclick = function(){
    //Lấy thông tin người dùng nhập
    var monAn = new MonAn();
    monAn.maMonAn = document.querySelector('#maMonAn').value;
    monAn.tenMonAn = document.querySelector('#tenMonAn').value;
    monAn.giaMonAn = document.querySelector('#giaTien').value;
    monAn.hinhMonAn = document.querySelector('#linkAnh').value;

    //Validation
    var valid = true; //Cờ hiệu

    //Kiểm tra valid rỗng
    valid &= checkError.kiemTraRong(monAn.maMonAn,'#error_maMonAn') & checkError.kiemTraRong(monAn.tenMonAn,'#error_tenMonAn') & checkError.kiemTraRong(monAn.giaMonAn,'#error_giaMonAn') & checkError.kiemTraRong(monAn.hinhMonAn,'#error_hinhMonAn');

    //Kiểm tra số
    valid &= checkError.kiemTraSo(monAn.maMonAn,'#error_number_maMonAn') & checkError.kiemTraSo(monAn.giaMonAn,'#error_number_giaMonAn');

    if (!valid){
        return;
    }

    //Thêm món vừa nhập vào mảng mangMonAn
    mangMonAn.push(monAn);
    //Lưu mảng vào storage
    saveFoodToStorage();
    //Tạo bảng để hiển thị lên màn hình kết quả món ăn
    renderTableFood(mangMonAn);
    //Gọi hàm clear thông tin sau khi đã nhập để tiện lợi cho việc nhập thông tin tiếp theo
    clearInfoFood();
}

//Hàm lưu mảng vào storage
function saveFoodToStorage(){
    //Biến đổi mảng thành chuỗi vì local storage chỉ lưu được chuỗi
    var sMangMonAn = JSON.stringify(mangMonAn);
    //Lưu chuỗi trên vào storage
    localStorage.setItem('mangMonAn',sMangMonAn);
}

//Hàm tạo bảng hiển thị lên giao diện
function renderTableFood(mangMonAn){
    //Duyệt mảng để tạo giao diện
    var ketQua = '';
    for (var index=0; index < mangMonAn.length; index++){
        //Lấy ra từng phần tử mảng
        var foodItem = mangMonAn[index];

        var phanTuMonAn = new MonAn(foodItem.maMonAn,foodItem.tenMonAn,foodItem.giaMonAn,foodItem.hinhMonAn);

        //Từ biến foodItem trên, tạo giao diện các thẻ tr,td
        ketQua+=`
        <tr style="line-height:100px;">
            <td>${phanTuMonAn.maMonAn}</td>
            <td>${phanTuMonAn.tenMonAn}</td>
            <td>${phanTuMonAn.giaMonAn}</td>
            <td><img style="width: 100px;height:100px;object-fit:cover; border-radius:50%;" src="${phanTuMonAn.hinhMonAn}" /></td>
            <td><button class="btn btn-danger" id="btnXoaMon" onclick="xoaMonAn('${phanTuMonAn.maMonAn}')">Xoá</button></td>
        </tr>
        `;
    }
    document.querySelector('tbody').innerHTML = ketQua;
    return ketQua;
}

//Lấy dữ liệu từ local Storage ra table
function layStorage(){
    //Kiểm tra mảng có xác định hay ko trước khi lấy 
    if (localStorage.getItem('mangMonAn')){
        //Lấy giá trị từ local storage ra (Chuỗi)
        var sMangMonAn = localStorage.getItem('mangMonAn');
        //Chuyển chuỗi thành mảng 
        mangMonAn = JSON.parse(sMangMonAn);
        //Gọi hàm tạo bảng đưa lên giao diện
        renderTableFood(mangMonAn);
    }
}
//Gọi hàm lấy dữ liệu từ local storage ra table để hiển thị
layStorage();

//Hàm xóa món ăn
function xoaMonAn(maMonAnClick){
    //Duyệt phần tử của mảng món ăn
    for (var index=0; index < mangMonAn.length; index++){
        //Lấy từng phần tử của mảng
        var foodItem = mangMonAn[index];
        //Nếu món ăn trong mảng có mã = mã mà người dùng click nút xóa
        if (foodItem.maMonAn === maMonAnClick){
            mangMonAn.splice(index,1);
        }
    }
    //Sau khi xóa thì xuất lại mảng mới rồi in ra giao diện và lưu lại mảng mới vào storage
    renderTableFood(mangMonAn);
    saveFoodToStorage();
}

//Hàm clear thông tin món đã nhập để điền món tiếp theo cho tiện lợi
function clearInfoFood(){
    document.querySelector('#maMonAn').value='';
    document.querySelector('#tenMonAn').value='';
    document.querySelector('#giaTien').value='';
    document.querySelector('#linkAnh').value='';
}