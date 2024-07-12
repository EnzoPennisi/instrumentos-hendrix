package com.example.apiinstrumentos.controller.mercadoPago;

import com.example.apiinstrumentos.entities.Pedido;
import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.PreferenceBackUrlsRequest;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.preference.Preference;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class MercadoPagoController {

    public PreferenceMP getPreferenciaIdMercadoPago(Pedido pedido) {
        try {

            MercadoPagoConfig.setAccessToken("TEST-2078179301936383-052017-d23928c65f2c1286d70003dae124e291-196703545");

            PreferenceItemRequest itemRequest = PreferenceItemRequest.builder()
                    .id(String.valueOf(pedido.getId()))
                    .title("Instrumentos")
                    .description("Pedido realizado desde el carrito de compras")
                    .pictureUrl("https://img-global.cpcdn.com/recipes/0709fbb52d87d2d7/1200x630cq70/photo.jpg")
                    .quantity(1)
                    .currencyId("ARG")
                    .unitPrice(BigDecimal.valueOf(pedido.getTotalPedido()))
                    .build();

            List<PreferenceItemRequest> items = new ArrayList<>();
            items.add(itemRequest);

            PreferenceBackUrlsRequest backURL = PreferenceBackUrlsRequest.builder()
                    .success("http://localhost:5173/mpsuccess")
                    .pending("http://localhost:5173/mppending")
                    .failure("http://localhost:5173/mpfailure")
                    .build();

            PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                    .items(items)
                    .backUrls(backURL)
                    .build();

            PreferenceClient client = new PreferenceClient();

            Preference preference = client.create(preferenceRequest);

            System.out.println(preference.getResponse());

            PreferenceMP mpPreference = new PreferenceMP();
            mpPreference.setStatusCode(preference.getResponse().getStatusCode());
            mpPreference.setId(preference.getId());

            return mpPreference;

        } catch (MPApiException e) {
            var apiResponse = e.getApiResponse();
            var content = apiResponse.getContent();
            System.out.println(content);
            return null;
        } catch (MPException e) {
            throw new RuntimeException(e);
        }

    }

}
