var arrayFoodChoosed = []; //Tạo mảng các món được chọn để hiển thị bên hóa đơn

//Viết hàm xây dựng giao diện danh mục menu từ mảng arrMonAn có sẵn
function buildFoodMenu(arrFood) {
  var ketQua = "";
  //Duyệt mảng arrMonAn để lấy từng phần tử cho vào giao diện menu
  for (var index = 0; index < arrFood.length; index++) {
    //Lấy ra từng phần tử của mảng
    var foodItem = arrFood[index];

    //Xây dựng giao diện menu
    ketQua += `     
        <div class="row mt-3">
            <div class="col-3">${foodItem.maMonAn}</div>
            <div class="col-3">${foodItem.tenMonAn}</div>
            <div class="col-3">${foodItem.giaTien}</div>
            <div class="col-3">
                <button class="bg-danger text-white btn" onclick="themMon('${foodItem.maMonAn}')">+</button>
                <button class="bg-danger text-white btn">-</button>
            </div>
        </div>
        `;
  }
  document.querySelector(".baiTap2 .card .card-body").innerHTML =
    `<div class="row">
        <div class="col-3 font-weight-bold">Mã món</div>
        <div class="col-3 font-weight-bold">Tên món</div>
        <div class="col-3 font-weight-bold">Giá tiền</div>
        <div class="col-3 font-weight-bold">Thao tác</div>
    </div>` + ketQua;
  return ketQua;
}
//Gọi hàm xây dựng giao diện menu
buildFoodMenu(arrMonAn);

// console.log(arrMonAn);

//Chức năng button + : thêm món ăn từ menu và tính số lượng
function themMon(maMonAnClick) {
  //Duyệt mảng món ăn trong menu
  for (var index = 0; index < arrMonAn.length; index++) {
    //Lấy ra từng phần tử của mảng trên
    var foodPlusItem = arrMonAn[index];
    //Nếu mã món ăn được click trùng với mã món ăn nào trong mảng thì thực hiện chức năng hàm
    if (Number(foodPlusItem.maMonAn) == Number(maMonAnClick)) {
      //Thêm phần tử thỏa điều kiện trên vào mảng hóa đơn
      arrayFoodChoosed.push(foodPlusItem);
    }
  }

  buildBill(arrayFoodChoosed);
}

//Viết hàm tạo bảng xuất hóa đơn
function buildBill(arrayFoodChoosed) {
  var ketQua = "";
  //Duyệt mảng
  for (var index = 0; index < arrayFoodChoosed.length; index++) {
    //Lấy ra từng phần tử mảng
    var monAnDuocChon = arrayFoodChoosed[index];

    //Xây dựng giao diện để hiển thị lên giao diện menu
    ketQua += `
            <tr>
                <td>${monAnDuocChon.maMonAn}</td>
                <td>${monAnDuocChon.tenMonAn}</td>
                <td>${soLuongMon(monAnDuocChon.maMonAn)}</td>
                <td>${tongTienMoiLoaiMon(monAnDuocChon.maMonAn)}</td>
            </tr>
        `;
  }
  document.querySelector(".baiTap2 #bill .card-body #tblHoaDon").innerHTML =
    ketQua +
    `
    <tfoot>
    <tr>
        <tr>
            <td></td>
            <td></td>
            <td id="txtThanhTien" class="font-weight-bold">Tổng tiền</td>
            <td>${tongTien()}</td>
        </tr>
    </tr>
    </tfoot>
    `;
  return ketQua;
}

//Viết hàm tính số lượng món ăn được chọn cho hóa đơn
function soLuongMon(maMonClick) {
  var count = 0;
  //Duyệt mảng món ăn đã được chọn trong menu
  for (var index = 0; index < arrayFoodChoosed.length; index++) {
    //Lấy ra từng phần tử của mảng trên
    var foodPlusItem = arrayFoodChoosed[index];
    //Nếu mã món ăn được click trùng với mã món ăn nào trong mảng thì số lượng sẽ tăng
    if (Number(foodPlusItem.maMonAn) == Number(maMonClick)) {
      count++;
    }
  }
  return count;
}

//Viết hàm tính tổng tiền mỗi loại món ăn
function tongTienMoiLoaiMon(maMonAnClick){
    var totalPerFood = 0;
    if (Number(maMonAnClick) == Number(arrayFoodChoosed.maMonAn)){
        totalPerFood += arrayFoodChoosed.giaTien;
    }
    return totalPerFood;
}

//Viết hàm tính tổng tiền cho hóa đơn
function tongTien() {
  var total = 0;
  //Duyệt mảng các món ăn đã chọn
  for (var index = 0; index < arrayFoodChoosed.length; index++) {
    //lấy ra từng phần tử mảng
    var foodChoosedItem = arrayFoodChoosed[index];
    //Tính tiền phần tử
    total += foodChoosedItem.giaTien;
  }
  return total;
}
