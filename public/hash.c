#include <stdio.h>
int main(){
    long sum = 0;
    for (int i = 0; i < 10000000; i++) {
        sum += i;
    }
    return sum;
}