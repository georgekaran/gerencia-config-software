package br.com.agi.agi.utils;

import java.util.List;

public class ApiListResponse<T> {

    private List<T> data;

    private int page;

    private int size;

    public List<T> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }
}