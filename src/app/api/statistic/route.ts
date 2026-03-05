import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    // Total donators
    const totalDonators = await prisma.register.count();
    const totalDonatorsConfirmed = await prisma.register.count({
      where: {payment_status: "Approved" }
    });

    // Donators without order
    const donatorsWithoutOrder = await prisma.register.count({
      where: { shipment_status: "5" },
    });

    // Donators without order
    const donatorsWithoutOrderConfirmed = await prisma.register.count({
      where: { shipment_status: "5", payment_status: "Approved" },
    });

    // Donators with pin-postcard order (A)
    const donatorsAllCardOrder = await prisma.register.count({
      where: { card: { not: 0 } },
    });

    // Donators with pin-postcard order (A)
    const donatorsAllCardOrderConfirmed = await prisma.register.count({
      where: { card: { not: 0 }, payment_status: "Approved" }
    });

    // Donators with pin-box order (B)
    const donatorsAllBoxOrder = await prisma.register.count({
      where: { cardwithbox: { not: 0 } },
    });

    // Donators with pin-box order (B)
    const donatorsAllBoxOrderConfirmed = await prisma.register.count({
      where: { cardwithbox: { not: 0 }, payment_status: "Approved" }
    });

    // Donators with shirt order (C)
    const donatorsWithShirtOrder = await prisma.register.count({
      where: { shirts: { not: "" } },
    });

    // Donators with shirt order (C)
    const donatorsWithShirtOrderConfirmed = await prisma.register.count({
      where: { shirts: { not: "" }, payment_status: "Approved" },
    });

    // Donators with commemorable pin-postcard or pin-box order (A U B)
    const donatorsWithCardOrder = await prisma.register.count({
      where: {
        OR: [{ card: { not: 0 } }, { cardwithbox: { not: 0 } }],
      },
    });

    // Donators with commemorable pin-postcard or pin-box order (A U B)
    const donatorsWithCardOrderConfirmed = await prisma.register.count({
      where: {
        OR: [{ card: { not: 0 } }, { cardwithbox: { not: 0 } }],
        payment_status: "Approved"
      },
    });

    // Donators with both shirt and (pin-postcard or pin-box) order ((A U B) ^ C)
    const donatorsWithBothOrders = await prisma.register.count({
      where: {
        OR: [{ card: { not: 0 } }, { cardwithbox: { not: 0 } }],
        shirts: { not: "" },
      },
    });

    // Donators with both shirt and (pin-postcard or pin-box) order ((A U B) ^ C)
    const donatorsWithBothOrdersConfirmed = await prisma.register.count({
      where: {
        OR: [{ card: { not: 0 } }, { cardwithbox: { not: 0 } }],
        shirts: { not: "" },
        payment_status: "Approved"
      },
    });

    const totalMoneyData = await prisma.register.findMany();
    const totalMoney = totalMoneyData.reduce(
      (sum: number, registration: { payment_amount: string | null }) => {
        const payValue = parseFloat(registration.payment_amount || "0") || 0; // Convert string to number, default to 0 if null
        return parseInt(((sum + payValue) * 100).toFixed(0)) / 100;
      },
      0
    );
    const totalMoneyApprovedData = await prisma.register.findMany({
      where: { payment_status: "Approved" },
    });
    const totalMoneyApproved = totalMoneyApprovedData.reduce(
      (sum: number, registration: { payment_amount: string | null }) => {
        const payValue = parseFloat(registration.payment_amount || "0") || 0; // Convert string to number, default to 0 if null
        return parseInt(((sum + payValue) * 100).toFixed(0)) / 100;
      },
      0
    );

    // Total commemorable card order
    const totalCardOrdersData = await prisma.register.findMany();
    const totalCardOrders = totalCardOrdersData.reduce(
      (sum: number, registration: { card: number | null }) => {
        const cardValue = registration.card ?? 0; // Use nullish coalescing to default to 0
        return sum + cardValue;
      },
      0
    );

    // Total commemorable card with box orders
    const totalCardwithboxOrdersData = await prisma.register.findMany();
    const totalCardwithboxOrders = totalCardwithboxOrdersData.reduce(
      (sum: number, registration: { cardwithbox: number | null }) => {
        const cardValue = registration.cardwithbox ?? 0; // Use nullish coalescing to default to 0
        return sum + cardValue;
      },
      0
    );

    // Total commemorable card order from users with approved payment
    const totalCardOrdersApprovedData = await prisma.register.findMany({
      where: { payment_status: "Approved" },
    });
    const totalCardOrdersApproved = totalCardOrdersApprovedData.reduce(
      (sum: number, registration: { card: number | null }) => {
        const cardValue = registration.card ?? 0; // Use nullish coalescing to default to 0 if null
        return sum + cardValue;
      },
      0
    );

    const totalCardwithboxOrdersApprovedData = await prisma.register.findMany({
      where: { payment_status: "Approved" },
    });
    const totalCardwithboxOrdersApproved =
      totalCardwithboxOrdersApprovedData.reduce(
        (sum: number, registration: { cardwithbox: number | null }) => {
          const cardValue = registration.cardwithbox ?? 0; // Use nullish coalescing to default to 0 if null
          return sum + cardValue;
        },
        0
      );

    // Total shirt orders
    const totalShirtOrders = await prisma.register.findMany();
    const shirtCounts: { [key: string]: number } = {};

    totalShirtOrders.forEach((registration: { shirts: string | null }) => {
      if (registration.shirts) {
        const shirts = registration.shirts.split(";");
        shirts.forEach((shirt) => {
          const [size, color, amount] = shirt.split("-");
          const key = `${size}-${color}`;
          shirtCounts[key] = (shirtCounts[key] || 0) + (parseInt(amount) || 0); // Ensure amount is a number
        });
      }
    });

    // Total shirt orders with approved payment status
    const totalShirtOrdersApproved = await prisma.register.findMany({
      where: { payment_status: "Approved" },
    });
    const shirtCountsApproved: { [key: string]: number } = {};
    totalShirtOrdersApproved.forEach((registration: { shirts: string | null }) => {
      if (registration.shirts) {
        const shirts = registration.shirts.split(";");
        shirts.forEach((shirt) => {
          const [size, color, amount] = shirt.split("-");
          const key = `${size}-${color}`;
          shirtCountsApproved[key] =
            (shirtCountsApproved[key] || 0) + parseInt(amount);
        });
      }
    });

    return NextResponse.json({
      totalDonators,
      totalDonatorsConfirmed,
      totalMoney,
      totalMoneyApproved,
      totalCardwithboxOrders,
      totalCardwithboxOrdersApproved,
      donatorsWithoutOrder,
      donatorsWithShirtOrder,
      donatorsWithCardOrder,
      donatorsWithBothOrders,
      donatorsWithoutOrderConfirmed,
      donatorsWithShirtOrderConfirmed,
      donatorsWithCardOrderConfirmed,
      donatorsWithBothOrdersConfirmed,
      
      donatorsAllCardOrder,
      donatorsAllCardOrderConfirmed,
      donatorsAllBoxOrder,
      donatorsAllBoxOrderConfirmed,

      totalCardOrders,
      totalCardOrdersApproved,
      totalShirtOrders: shirtCounts,
      totalShirtOrdersApproved: shirtCountsApproved,
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}
