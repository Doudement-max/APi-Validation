/*import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import Shopify, { IOrder } from 'shopify-api-node'; // Importe os tipos corretos

@Injectable()
export class OrderService {
  private readonly order = [];
  private shopify: Shopify; // Substitua por sua instância do Shopify

  constructor() {
    this.shopify = new Shopify({  }); 
  }

  create(createOrderDto: CreateOrderDto){
    this.order.push(createOrderDto);
  }

  findAll(){
    return this.order;
  }

  findOne(id: number) {
    return this.order.find(item => item.id === id);
  }

  async createOrderWithSession(session: any) {
    const order: IOrder = {
      line_items: [
        {
          title: "Big Brown Bear Boots",
          price: 74.99,
          grams: 1300,
          quantity: 3,
          tax_lines: [
            {
              price: 13.5,
              rate: 0.06,
              title: "State tax"
            }
          ]
        }
      ],
      transactions: [
        {
          kind: "sale",
          status: "success",
          amount: 238.47
        }
      ],
      total_tax: 13.5,
      currency: "EUR"
    };

    return await this.shopify.order.create(order);
  }
}
*/

import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import  Shopify, {IOrder } from 'shopify-api-node';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class OrderService {
  create(createOrderDto: CreateOrderDto) {
      throw new Error("Method not implemented.");
  }
  createOrderWithSession(session: any) {
      throw new Error("Method not implemented.");
  }
  findAll() {
      throw new Error("Method not implemented.");
  }
  findOne(id: string) {
      throw new Error("Method not implemented.");
  }
  private readonly shopify: Shopify;

  constructor() {
    this.shopify = new Shopify({
      shopName: 'sua-loja.myshopify.com', 
      apiKey: 'sua-chave-de-api', 
      password: 'sua-senha-da-api',
      apiVersion: '2024-04', 
    });
  }

  async createOrder(createOrderDto: CreateOrderDto) {
    
    const errors = await validate(createOrderDto);

    if (errors.length > 0) {
      
      return;
    }

    
    const order: IOrder = {
      line_items: createOrderDto.lineItems.map(item => ({
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        tax_lines: [
          {
            price: item.price * 0.1,
            rate: 0.1,
            title: "Imposto"
          }
        ]
      })),
      /*transactions: [
        {
          kind: "sale",
          status: "success",
          amount: createOrderDto.lineItems.reduce((total, item) => total + (item.price * item.quantity), 0) + createOrderDto.totalTax
        }
      ],*/
      total_tax: createOrderDto.totalTax,
      currency: createOrderDto.currency,
      app_id: 0,
      billing_address: undefined,
      browser_ip: '',
      buyer_accepts_marketing: false,
      cancel_reason: 'customer',
      cancelled_at: '',
      cart_token: '',
      client_details: undefined,
      checkout_token: '',
      closed_at: '',
      confirmed: false,
      contact_email: '',
      created_at: '',
      current_subtotal_price: '',
      current_subtotal_price_set: undefined,
      current_total_discounts: '',
      current_total_discounts_set: undefined,
      current_total_duties_set: undefined,
      current_total_price: '',
      current_total_price_set: undefined,
      current_total_tax: '',
      current_total_tax_set: undefined,
      customer_locale: '',
      discount_applications: [],
      discount_codes: [],
      email: '',
      financial_status: 'authorized',
      fulfillments: [],
      fulfillment_status: 'fulfilled',
      gateway: '',
      id: 0,
      landing_site: '',
      location_id: 0,
      name: '',
      note: '',
      note_attributes: [],
      number: 0,
      order_number: 0,
      order_status_url: '',
      payment_gateway_names: [],
      phone: '',
      presentment_currency: '',
      processed_at: '',
      checkout_id: 0,
      processing_method: 'checkout',
      referring_site: '',
      refunds: [],
      shipping_address: undefined,
      shipping_lines: [],
      source_identifier: '',
      source_name: '',
      subtotal_price: '',
      subtotal_price_set: undefined,
      tags: '',
      tax_lines: [],
      taxes_included: false,
      test: false,
      token: '',
      total_discounts: '',
      total_discounts_set: undefined,
      total_line_items_price: '',
      total_line_items_price_set: undefined,
      total_outstanding: '',
      total_price: '',
      total_price_set: undefined,
      total_shipping_price_set: undefined,
      total_tax_set: undefined,
      total_tip_received: '',
      total_weight: 0,
      updated_at: '',
      user_id: 0
    };

    // Crie o pedido na Shopify usando a API
    return await this.shopify.order.create(order);
  }
}
