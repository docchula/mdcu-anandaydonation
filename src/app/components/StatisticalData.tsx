"use client";

import React from "react";

interface StatisticalDataProps {
  statistics: {
    totalDonators: number;
    totalDonatorsConfirmed: number;
    totalMoney: number;
    totalMoneyApproved: number;
    totalCardwithboxOrders: number;
    totalCardwithboxOrdersApproved: number;
    donatorsWithoutOrder: number;
    donatorsWithShirtOrder: number;
    donatorsWithCardOrder: number;
    donatorsWithBothOrders: number;
    donatorsWithoutOrderConfirmed: number;
    donatorsWithShirtOrderConfirmed: number;
    donatorsWithCardOrderConfirmed: number;
    donatorsWithBothOrdersConfirmed: number;
    donatorsAllCardOrder: number;
    donatorsAllCardOrderConfirmed: number;
    donatorsAllBoxOrder: number;
    donatorsAllBoxOrderConfirmed: number;
    totalCardOrders: number;
    totalCardOrdersApproved: number;
    totalShirtOrders: { [key: string]: number };
    totalShirtOrdersApproved: { [key: string]: number };
  };
}

const StatisticalData: React.FC<StatisticalDataProps> = ({ statistics }) => {
  return (
    <div className="space-x-4 space-y-0.5">
      <h2 className="text-xl font-bold">ข้อมูลสถิติ</h2>
      <p>ผู้บริจาครวมทั้งหมด (ยืนยันการชำระเงินแล้ว): {statistics.totalDonatorsConfirmed}</p>
      <p>ยอดบริจาครวม (ยืนยันการชำระเงินแล้ว): {statistics.totalMoneyApproved}</p>
      <p>ผู้บริจาคที่ไม่มีคำสั่งซื้อ (ยืนยันการชำระเงินแล้ว): {statistics.donatorsWithoutOrderConfirmed}</p>
      <p>ผู้บริจาคที่สั่งซื้อเข็ม-โปสการ์ดที่ระลึก (ยืนยันการชำระเงินแล้ว): {statistics.donatorsAllCardOrderConfirmed}</p>
      <p>ผู้บริจาคที่สั่งซื้อเข็มพร้อมกล่องที่ระลึก (ยืนยันการชำระเงินแล้ว): {statistics.donatorsAllBoxOrderConfirmed}</p>
      <p>ผู้บริจาคที่สั่งซื้อเสื้อที่ระลึก (ยืนยันการชำระเงินแล้ว): {statistics.donatorsWithShirtOrderConfirmed}</p>
      <p>ผู้บริจาคที่สั่งซื้อเข็มที่ระลึกหรือเข็มพร้อมกล่อง (ยืนยันการชำระเงินแล้ว): {statistics.donatorsWithCardOrderConfirmed}</p>
      <p>ผู้บริจาคที่สั่งซื้อทั้งเสื้อที่ระลึกและเข็มที่ระลึก (ยืนยันการชำระเงินแล้ว): {statistics.donatorsWithBothOrdersConfirmed}</p>
      <p>ยอดสั่งซื้อเข็ม-โปสการ์ดที่ระลึกทั้งหมด (ยืนยันการชำระเงินแล้ว): {statistics.totalCardOrdersApproved}</p>
      <p>ยอดสั่งซื้อเข็มพร้อมกล่องทั้งหมด (ยืนยันการชำระเงินแล้ว): {statistics.totalCardwithboxOrdersApproved}</p>
      <br />
      <p>ผู้บริจาครวมทั้งหมด (รวมปฏิเสธและรอดำเนินการ): {statistics.totalDonators}</p>
      <p>ยอดบริจาครวม (ทั้งหมด รวมปฏิเสธและรอดำเนินการ): {statistics.totalMoney}</p>
      <p>ผู้บริจาคที่ไม่มีคำสั่งซื้อ (ทั้งหมด): {statistics.donatorsWithoutOrder}</p>
      <p>ผู้บริจาคที่สั่งซื้อเข็ม-โปสการ์ดที่ระลึก (ทั้งหมด): {statistics.donatorsAllCardOrder}</p>
      <p>ผู้บริจาคที่สั่งซื้อเข็มพร้อมกล่องที่ระลึก (ทั้งหมด): {statistics.donatorsAllBoxOrder}</p>
      <p>ผู้บริจาคที่สั่งซื้อเสื้อที่ระลึก (ทั้งหมด): {statistics.donatorsWithShirtOrder}</p>
      <p>ผู้บริจาคที่สั่งซื้อเข็มที่ระลึกหรือเข็มพร้อมกล่อง (ทั้งหมด): {statistics.donatorsWithCardOrder}</p>
      <p>ผู้บริจาคที่สั่งซื้อทั้งเสื้อที่ระลึกและเข็มที่ระลึก (ทั้งหมด): {statistics.donatorsWithBothOrders}</p>
      <p>ยอดสั่งซื้อเข็ม-โปสการ์ดที่ระลึกทั้งหมด (ทั้งหมด): {statistics.totalCardOrders}</p>
      <p>ยอดสั่งซื้อเข็มพร้อมกล่องทั้งหมด (ทั้งหมด): {statistics.totalCardwithboxOrders}</p>
      <h3 className="font-bold">ยอดสั่งซื้อเสื้อที่ระลึกทั้งหมด:</h3>
      {Object.entries(statistics.totalShirtOrders).map(([key, count]) => (
        <p key={key}>
          รวม {key}: {count}
        </p>
      ))}

      <h3 className="font-bold">ยอดสั่งซื้อเสื้อที่ระลึกทั้งหมด (ชำระเงินแล้ว):</h3>
      {Object.entries(statistics.totalShirtOrdersApproved).map(
        ([key, count]) => (
          <p key={key}>
            รวม {key}: {count}
          </p>
        )
      )}
    </div>
  );
};

export default StatisticalData;
