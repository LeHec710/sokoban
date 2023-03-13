<?php

namespace App\DataFixtures;

use App\Entity\Plateaux;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $plateauC = new plateau;
        $plateauC
            ->setName("Cor")
            ->setRows(9)
            ->setCols(6)
            ->setGrid(["######", "x.#px.", "..x..x", "#x..x#", "xx##..", "x.x##.", "xxx...", "...x##", "#x#.x#"]);
        $manager->persist($plateauC);
        $plateauH = new plateau;
        $plateauH
            ->setName("Hec")
            ->setRows(5)
            ->setCols(10)
            ->setGrid(["#x..x##..x", "x####..x#.", "#xx..xx..#", "..#....x..", "##.x.p##x."]);
        $manager->persist($plateauH);
        $manager->flush();
    }
}
