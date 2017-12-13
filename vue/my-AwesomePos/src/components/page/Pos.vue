<template>
  <div class="pos">
    <div>
      <el-row>
        <el-col :span='7' id="order-list" class="pos-order">
          <el-tabs>
            <el-tab-pane label="点餐">
              <el-table :data="tableData">
                <el-table-column prop="goodsName" label="商品"></el-table-column>
                <el-table-column prop="count" label="量" width="50"></el-table-column>
                <el-table-column prop="price" label="金额" width="70"></el-table-column>
                <el-table-column label="操作" width="100" fixed="right">
                  <template scope="scope">
                    <el-button type="text" size="small" @click="delSingleGoods(scope.row)">删除</el-button>
                    <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
                    <!--scope.row 传入当前行的数据-->
                  </template>
                </el-table-column>
              </el-table>
              <div class="totalDiv">
                <span>数量：{{totalCount}}</span>
                <span>金额：{{totalMoney}}</span>
              </div>
              <div class="order-btn">
                <el-button type="danger" @click="delAllGoods">删除</el-button>
                <el-button type="success" @click="checkup">结账</el-button>
              </div>

            </el-tab-pane>
            <el-tab-pane label="挂单">
              挂单
            </el-tab-pane>
            <el-tab-pane label="外卖">
              外卖
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <!--商品展示-->
        <el-col :span="17">
          <div class="often-goods">
            <div class="title">常用商品</div>
            <div class="often-goods-list">
              <ul>
                <li v-for="item in oftenGoods" @click="addOrderList(item)">
                  <span>{{item.goodsName}}</span>
                  <span class="o-price">￥{{item.price}}元</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="goods-type">
            <el-tabs>
              <el-tab-pane label="汉堡">
                <ul class='cookList'>
                  <li v-for="item in type0Goods" @click="addOrderList(item)">
                    <span class="foodImg"><img :src="item.goodsImg" width="100%"></span>
                    <span class="foodName">{{item.goodsName}}</span>
                    <span class="foodPrice">￥{{item.price}}元</span>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="小食">
                <ul class='cookList'>
                  <li v-for="item in type1Goods" @click="addOrderList(item)">
                    <span class="foodImg"><img :src="item.goodsImg" width="100%"></span>
                    <span class="foodName">{{item.goodsName}}</span>
                    <span class="foodPrice">￥{{item.price}}元</span>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="饮料">
                <ul class='cookList'>
                  <li v-for="item in type2Goods" @click="addOrderList(item)">
                    <span class="foodImg"><img :src="item.goodsImg" width="100%"></span>
                    <span class="foodName">{{item.goodsName}}</span>
                    <span class="foodPrice">￥{{item.price}}元</span>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="套餐">
                <ul class='cookList'>
                  <li v-for="item in type3Goods" @click="addOrderList(item)">
                    <span class="foodImg"><img :src="item.goodsImg" width="100%"></span>
                    <span class="foodName">{{item.goodsName}}</span>
                    <span class="foodPrice">￥{{item.price}}元</span>
                  </li>
                </ul>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Pos',
    data() {
      return {
        tableData: [],
        oftenGoods: [],
        type0Goods: [],
        type1Goods: [],
        type2Goods: [],
        type3Goods: [],
        totalMoney: 0,
        totalCount: 0
      }
    },
    created: function () {
      axios.get('http://jspang.com/DemoApi/oftenGoods.php')
        .then(response => {
          this.oftenGoods = response.data;
        })
        .catch(error => {
          alert('网络错误，不能访问');
        })

      axios.get('http://jspang.com/DemoApi/typeGoods.php')
        .then(response => {
          this.type0Goods = response.data[0];
          this.type1Goods = response.data[1];
          this.type2Goods = response.data[2];
          this.type3Goods = response.data[3];
        })
        .catch(error => {
          console.log(error);
          alert('网络错误，不能访问');
        })
    },
    mounted: function () {
      var orderHeight = document.body.clientHeight;
      document.getElementById("order-list").style.height = orderHeight + 'px';
    },
    methods: {
      addOrderList(goods) {
        let hasGoods = false;
        //判断是否存在列表中
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].goodsId == goods.goodsId) {
            hasGoods = true;
          }
        }

        //存在数量+1
        if (hasGoods) {
          let arr = this.tableData.filter(a => a.goodsId == goods.goodsId);
          arr[0].count++;
          arr[0].price = arr[0].count * goods.price;
        } else {
          let newGoods = {
            goodsName: goods.goodsName,
            goodsId: goods.goodsId,
            price: goods.price,
            count: 1
          };
          this.tableData.push(newGoods);
        }

        this.getTotal();

      },
      getTotal() {
        this.totalMoney = 0;
        this.totalCount = 0;

        this.tableData.forEach((goodsItem) => {
          this.totalCount += goodsItem.count;
          this.totalMoney += goodsItem.price;
        })
      },
      delSingleGoods(goods) {
        this.tableData = this.tableData.filter(a =>a.goodsId != goods.goodsId);
        this.getTotal();
      },
      delAllGoods() {
        this.tableData = [];
        this.totalMoney = 0;
        this.totalCount = 0;
      },
      checkup(){
        if(this.tableData != 0) {
          this.delAllGoods();
          this.$message({
            message: '结算成功，感谢您的光临',
            type: 'success'
          })
        } else {
          this.$message({
            message: '请先选购商品',
            type: 'error'
          })
        }

      }
    }
  }
</script>
<style scoped>
  .pos {
    font-size: 12px;
  }

  .pos-order {

    background-color: #F9FAFC;
    border-right: 1px solid #C0CCDA;
  }

  .order-btn {
    margin-top: 10px;
    text-align: center;
  }

  .title {
    height: 20px;
    border-bottom: 1px solid #D3DCE6;
    background-color: #F9FAFC;
    padding: 10px;
  }

  .often-goods-list ul li {
    list-style: none;
    float: left;
    border: 1px solid #E5E9F2;
    padding: 10px;
    margin: 5px;
    background-color: #fff;
    cursor: pointer;
  }

  .goods-type {
    clear: both;
  }

  .o-price {
    color: #58B7FF;
  }

  .often-goods-list {
    border-bottom: 1px solid #C0CCDA;
    height: auto;
    overflow: hidden;
    padding-bottom: 10px;
    background-color: #F9FAFC;
  }

  .cookList li {
    list-style: none;
    width: 23%;
    border: 1px solid #E5E9F2;
    height: auto;
    overflow: hidden;
    background-color: #fff;
    padding: 2px;
    float: left;
    margin: 2px;
    cursor: pointer;
  }

  .cookList li span {

    display: block;
    float: left;
  }

  .foodImg {
    width: 40%;
  }

  .foodName {
    font-size: 18px;
    padding-left: 10px;
    color: brown;
  }

  .foodPrice {
    font-size: 16px;
    padding-left: 10px;
    padding-top: 10px;
  }

  .totalDiv {
    height: auto;
    overflow: hidden;
    text-align: center;
    font-size: 16px;
    background-color: #fff;
    border-bottom: 1px solid #E5E9F2;
    padding: 10px;
  }
</style>
